import mongoose from 'mongoose';
import path from 'path';
import Nap from '../models/napModel.js';
import config from '../config/config.js';

import {dirname} from 'path';
import {fileURLToPath} from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

function initMongoose() {
  mongoose.connect(config.db.uri, {useNewUrlParser: true});
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
}

export const getNapList = async (req, res) => {
	let db = req.app.locals.db;
	Nap.find({}, (err, data) => {
		res.status(200).json(data);
	});
}

export const getNap = async (req, res) => {
	let db = req.app.locals.db;
	Nap.findOne({_id: req.params.id}, (err, data) => {
		res.status(200).json(data);
	});
}

export const createNap = async (req, res) => {
	try {
		let db = req.app.locals.db;
		const params = req.body;
		const nap = await Nap.create(params);
		res.status(200).type('json').send(nap);
	} catch(err) {
		res.status(403).type('json').send(err);
	}
}

export const removeNap = async (req, res) => {
	let db = req.app.locals.db;
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
	let db = req.app.locals.db;
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