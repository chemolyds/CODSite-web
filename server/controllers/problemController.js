import mongoose from 'mongoose';
import path from 'path';
import Problem from '../models/problemModel.js';
import config from '../config/config.js';

import {dirname} from 'path';
import {fileURLToPath} from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

function initMongoose() {
  mongoose.connect(config.db.uri, {useNewUrlParser: true});
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
}

export const getProblemList = async (req, res) => {
	initMongoose()
	Problem.find({}, (err, data) => {
		res.status(200).json(data);
	});
}

export const getProblem = async (req, res) => {
	initMongoose()
	Problem.findOne({_id: req.params.id}, (err, data) => {
		res.status(200).json(data);
	});
}

export const createProblem = async (req, res) => {
	try {
		initMongoose()
		const params = req.body;
		const problem = await Problem.create(params);
		res.status(200).type('json').send(problem);
	} catch(err) {
		res.status(403).type('json').send(err);
	}
}

export const removeProblem = async (req, res) => {
	initMongoose()
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
	initMongoose()
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