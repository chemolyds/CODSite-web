import path from 'path';
import Nap from '../models/napModel.js';

import {dirname} from 'path';
import {fileURLToPath} from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

export const getNapList = async (req, res) => {
	Nap.find({}, (err, data) => {
		res.status(200).json(data);
	});
}

export const getNap = async (req, res) => {
	Nap.findOne({_id: req.params.id}, (err, data) => {
		res.status(200).json(data);
	});
}

export const createNap = async (req, res) => {
	try {
		const params = req.body;
		const nap = await Nap.create(params);
		res.status(200).type('json').send(nap);
	} catch(err) {
		res.status(403).type('json').send(err);
	}
}

export const removeNap = async (req, res) => {
	Nap.findOneAndDelete({_id: req.params.id}, (err, data) => {
		if(err) {
			res.status(400).json(err);
			throw err;
		} else if(!data) {
			res.status(400).json({
				message: "NAP does not exist!"
			});
		} else {
			res.status(200).json(data);
		}
	});
}

export const updateNap = async (req, res) => {
	Nap.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, data) => {
		if (err) {
			res.status(400).json(err);
			throw err;
		} else if (!data) {
			res.status(400).json({message: "NAP does not exist"});
		} else {
			res.status(200).json(data);
		}
	});
}