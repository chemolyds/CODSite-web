import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

//Models
import About from '../models/aboutModel.js';
import FAQ from '../models/faqModel.js';
import Page from '../models/pageModel.js';
import User from '../models/userModel.js';

function initMongoose() {
  mongoose.connect(config.db.uri, {useNewUrlParser: true});
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
}

function signJWT(payload, res) {
	jwt.sign(payload, "jerdan1980", {expiresIn: 360000}, (err, token) => {
		if(err) {
			console.log("JWT error signing", err);
			res.status(400).json(err);
			throw err;
		}
		res.status(200).json({token});
	});
}

function buildPayload(user) {
  return {
    user_info: {
			username: user.username,
      id: user._id,
      isAdmin: user.isAdmin
    }
  }
}

export const signin = async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	initMongoose()
	let user = await User.findOne({username: username});
	console.log("THERE");
	if(!user) {
		return res.status(400).json({
			message: "User does not exist!"
		});
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if(!isMatch) {
		return res.status(400).json({
			message: "Incorrect password!"
		});
	}

	const payload = buildPayload(user);
	console.log(payload);
	signJWT(payload, res);
}

export const about = async (req, res) => {
	initMongoose()
	About.findOne({name: 'about'}, (err, data) => {
		res.status(200).json(data);
	});
}

export const getPageList = async (req, res) => {
	initMongoose()
	Page.find({}, (err, data) => {
		res.status(200).json(data);
	});
}

export const getPage = async (req, res) => {
	const page = req.params.page;
	initMongoose()
	Page.findOne({page: page}, (err, data) => {
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
	FAQ.findOne({_id: id}, (err, data) => {
		if (err) {
			res.status(400).json(err);
			throw err;
		} else if (!data) {
			res.status(400).json({message: "FAQ does not exist!"});
		} else {
			res.status(200).json(data);
		}
	});
}