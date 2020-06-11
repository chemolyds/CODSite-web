import mongoose from 'mongoose';
import path from 'path';
import Problem from '../models/ProblemModel.js';
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
	res.status(200).sendFile(path.join(__dirname, '../chicken.pdf'));
	//res.status(200).type('application/pdf').send(binaryData);
}