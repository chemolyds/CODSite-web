import mongoose from 'mongoose';
import config from '../config/config.js';

//Models
import About from '../models/aboutModel.js';
import faqModel from '../models/faqModel.js';

function initMongoose() {
  mongoose.connect(config.db.uri, {useNewUrlParser: true});
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
}

export const createAbout = async (req, res) => {
	initMongoose()
	let save_about
	save_about = new About({ contents: req.body.contents });
	save_about.save(function (err, save_about) {
		if (err) {
			return res.status(400).json(err);
		} else {
			console.log('saved =>', save_about);
			return res.status(200).json(save_about);
		}
	});
}

export const editAbout = async (req, res) => {
	initMongoose()
	About.findOneAndUpdate({name: 'about'}, {contents: req.body.contents}, {new: true}, (err, data) => {
		if (err) {
			res.status(400).json({err});
			throw err;
		} else if (!data) {
			res.status(400).json({ message: 'About does not exist!'});
		} else {
			res.status(200).json(data);
		}
	});
}

export const createFAQ = async (req, res) => {
	initMongoose()
	let save_FAQ
	save_FAQ = new faqModel({
		answer: req.body.answer,
		question: req.body.qeustion
	});
	save_FAQ.save(function (err, save_FAQ) {
		if (err) {
			return res.status(400).json(err);
		} else {
			console.log('saved =>', save_FAQ);
			return res.status(200).json(save_FAQ);
		}
	})
}

export const editFAQ = async (req, res) => {
	initMongoose()
	FAQ.findOneAndUpdate({_id, id}, req.body, {new: true}, (err, data) => {
		if (err) {
			res.status(400).json({err});
			throw err;
		} else if (!data) {
			res.status(400).json({message: "FAQ does not exist"});
		} else {
			res.status(200).json(data);
		}
	})
}

export const deleteFAQ = async (req, res) => {
	initMongoose()
	FAQ.findOneAndDelete({_id: id}, (err, data) => {
		if (err) {
			res.status(400).json({err});
		} else if (!data) {
			res.status(400).json({message: "FAQ does not exist"});
		} else {
			res.status(200).json(data);
		}
	});
}