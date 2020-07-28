import mongoose from 'mongoose';
import path from 'path';
import Problem from '../models/problemModel.js';
import config from '../config/config.js';

import {dirname} from 'path';
import {fileURLToPath} from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

let db;
function initMongoose() {
  mongoose.connect(config.db.uri, {useNewUrlParser: true});
  db = mongoose.connection;
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
	try {
		initMongoose()
		let data = await Problem.deleteOne({ _id: req.params.id });
		if (data.n !== 1) {
			data = { error: 'Problem not found!' };
			res.status(404).send(data);
		} else {
			data = { error: 'Problem deleted' };
			res.status(200).send(data);
		}
	} catch (err) {
		res.status(400).type('json').send(err);
	}
}

export const updateProblem = async (req, res) => {
	try {
		initMongoose()
		const updateParams = req.body;
		const problem = await Problem.findOneAndUpdate({_id: req.params.id}, updateParams).exec();
		res.status(200).type('json').send(problem);
	} catch(err) {
		res.status(403).type('json').send(err);
	}
}