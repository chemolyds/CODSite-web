import mongoose from 'mongoose';
import config from '../config/config.js';

//Models
import About from '../models/aboutModel.js';
import FAQ from '../models/faqModel.js';

function initMongoose() {
  mongoose.connect(config.db.uri, {useNewUrlParser: true});
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
}

export const about = async (req, res) => {
	initMongoose()
	About.findOne({name: 'about'}, (err, data) => {
		res.status(200).json(data);
	});
}

export const getFAQList = async (req, res) => {
	initMongoose()
	FAQ.find({}, (err, data) => {
		res.status(200).json(data);
	});
}

export const getFAQ = async (req, res) => {
	const id = req.params.id;
	initMongoose()
	FAQ.find({_id: id}, (err, data) => {
		if (err) {
			res.status(400).json({err});
			throw err;
		} else if (!data) {
			res.status(400).json({message: "FAQ does not exist!"});
		} else {
			res.status(200).json(data);
		}
	});
}