import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Models
import About from '../models/aboutModel.js';
import FAQ from '../models/faqModel.js';
import Page from '../models/pageModel.js';
import User from '../models/userModel.js';

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

export const login = async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	let user = await User.findOne({username: username});
	if(!user) {
		return res.status(400).json({
			message: "Bad Login!"
		});
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if(!isMatch) {
		return res.status(400).json({
			message: "Bad Login"
		});
	}

	const payload = buildPayload(user);
	console.log(payload);
	signJWT(payload, res);
}

export const about = async (req, res) => {
	About.findOne({name: 'about'}, (err, data) => {
		res.status(200).json(data);
	});
}

export const getPageList = async (req, res) => {
	Page.find({}, (err, data) => {
		res.status(200).json(data);
	});
}

export const getPage = async (req, res) => {
	const page = req.params.page;
	Page.findOne({page: page}, (err, data) => {
		res.status(200).json(data);
	});
}

export const getFAQList = async (req, res) => {
	FAQ.find({}, (err, data) => {
		res.status(200).json(data);
	});
}

export const getFAQ = async (req, res) => {
	const id = req.params.id;
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