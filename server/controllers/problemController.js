import path from 'path';
import Problem from '../models/problemModel.js';

import {dirname} from 'path';
import {fileURLToPath} from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

export const getProblemList = async (req, res) => {
	Problem.find({}, (err, data) => {
		res.status(200).json(data);
	});
}

export const getProblem = async (req, res) => {
	Problem.findOne({_id: req.params.id}, (err, data) => {
		res.status(200).json(data);
	});
}

export const createProblem = async (req, res) => {
	try {
		const params = req.body;
		const problem = await Problem.create(params);
		res.status(200).type('json').send(problem);
	} catch(err) {
		res.status(403).type('json').send(err);
	}
}

export const removeProblem = async (req, res) => {
	Problem.findOneAndDelete({_id: req.params.id}, (err, data) => {
		if(err) {
			res.status(400).json(err);
			throw err;
		} else if(!data) {
			res.status(400).json({
				message: "Problem does not exist!"
			});
		} else {
			res.status(200).json(data);
		}
	});
}

export const updateProblem = async (req, res) => {
	Problem.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, data) => {
		if (err) {
			res.status(400).json(err);
			throw err;
		} else if (!data) {
			res.status(400).json({message: "Problem does not exist"});
		} else {
			res.status(200).json(data);
		}
	});
}