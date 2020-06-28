import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

//Models
import About from '../models/aboutModel.js';
import FAQ from '../models/faqModel.js';
import Page from '../models/pageModel.js';

function initMongoose() {
  mongoose.connect(config.db.uri, {useNewUrlParser: true});
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
}

function signJWT(payload, res) {
	jwt.sign(payload, "chem", {expiresIn: 360000}, (err, token) => {
		if(err) {
			console.log("JWT error signing", err);
			throw err;
		}
		res.status(200).json({
			token
		});
	});
}

function buildPayload(user) {
  return {
    user_info: {
			username: user.username,
      id: user.id,
      is_admin: user.is_admin
    }
  }
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

export const createPage = async (req, res) => {
	initMongoose()
	let save_page = new Page({
		page: req.body.page,
		contents: req.body.contents
	});
	save_page.save(function (err, save_page) {
		if (err) {
			return res.status(400).json(err);
		} else {
			console.log('saved =>', save_page);
			return res.status(200).json(save_page);
		}
	});
}

export const editPage = async (req, res) => {
	const page = req.params.page;
	initMongoose();
	Page.findOneAndUpdate({page: page}, {contents: req.body.contents}, {new: true}, (err, data) => {
		if (err) {
			res.status(400).json({err});
			throw err;
		} else if (!data) {
			res.status(400).json({ message: 'Page contents does not exist!'});
		} else {
			res.status(200).json(data);
		}
	});
}

export const createFAQ = async (req, res) => {
	initMongoose()
	let save_FAQ
	save_FAQ = new FAQ({
		answer: req.body.answer,
		question: req.body.question
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
	const id = req.params.id;
	initMongoose()
	FAQ.findOneAndUpdate({_id: id}, req.body, {new: true}, (err, data) => {
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
	const id = req.params.id;
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