import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Models
import FAQ from '../models/faqModel.js';
import Page from '../models/pageModel.js';
import User from '../models/userModel.js';
import Categories from '../models/categoriesModel.js';

function signJWT(payload, res) {
	jwt.sign(payload, "jerdan1980", {expiresIn: 360000}, (err, token) => {
		if(err) {
			console.log("JWT error signing", err);
			throw err;
		}
		res.status(200).json({token});
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

export const getUserList = async (req, res) => {
	User.find({}, (err, data) => {
		res.status(200).json(data);
	});
}

export const getUser = async (req, res) => {
	const id = req.params.id;
	User.findOne({_id: id}, (err, data) => {
		if(err) {
			res.status(400).json(err);
			throw err;
		} else if (!data) {
			res.status(400).json({
				message: "User not found!"
			});
		} else {
			res.status(200).json(data);
		}
	});
}

export const createUser = async (req, res) => {
	//salt the password
	const salt = await bcrypt.genSalt(10);
	req.body.password = await bcrypt.hash(req.body.password, salt);

	let save_user
	save_user = new User({
		username: req.body.username,
		password: req.body.password,
		isAdmin: req.body.isAdmin
	});

	save_user.save(function (err, save_user) {
		if(err) {
			return res.status(400).json(err);
		} else {
			console.log('saved =>', save_user);
			return res.status(200).json(save_user);
		}
	})
}

export const editUser = async (req, res) => {
	//check to see if the password was changed
	if(req.body.password) {
		const salt = await bcrypt.genSalt(10);
		req.body.password = await bcrypt.hash(req.body.password, salt);
	}

	const id = req.params.id;
	User.findOneAndUpdate({_id: id}, req.body, {new: true}, (err, data) => {
		if(err) {
			res.status(400).json(err);
		} else if(!data) {
			res.status(400).json({
				message: "User does not exist!"
			});
		} else {
			res.status(200).json(data);
		}
	});
}

export const deleteUser = async (req, res) => {
	const id = req.params.id;
	User.findOneAndDelete({_id: id}, (err, data) => {
		if(err) {
			res.status(400).json(err);
			throw err;
		} else if(!data) {
			res.status(400).json({
				message: "User does not exist!"
			});
		} else {
			res.status(200).json(data);
		}
	});
}

export const createPage = async (req, res) => {
	let save_page = new Page({
		page: req.body.page,
		header: req.body.header,
		contents: req.body.contents
	});
	if (req.body.hidden) {
		payload.hidden = req.body.hidden;
	}
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

	//clean data
	let payload = {};
	if (req.body.header) {
		payload.header = req.body.header;
	}
	if (req.body.contents) {
		payload.contents = req.body.contents;
	}
	if (req.body.hidden) {
		payload.hidden = req.body.hidden;
	}

	Page.findOneAndUpdate({page: page}, payload, {new: true}, (err, data) => {
		if (err) {
			res.status(400).json(err);
			throw err;
		} else if (!data) {
			res.status(400).json({ message: 'Page contents does not exist!'});
		} else {
			res.status(200).json(data);
		}
	});
}

export const togglePage = async (req, res) => {
	const page = req.params.page;
	let bruh = await Page.findOne({page: page});
	Page.findOneAndUpdate({page: page}, {hidden: !bruh.hidden}, {new: true}, (err, data) => {
		if (err) {
			res.status(400).json(err);
			throw err;
		} else if (!data) {
			res.status(400).json({ message: 'Page contents does not exist!'});
		} else {
			res.status(200).json(data);
		}
	});
}

export const createFAQ = async (req, res) => {
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
	FAQ.findOneAndUpdate({_id: id}, req.body, {new: true}, (err, data) => {
		if (err) {
			res.status(400).json(err);
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
	FAQ.findOneAndDelete({_id: id}, (err, data) => {
		if (err) {
			res.status(400).json(err);
		} else if (!data) {
			res.status(400).json({message: "FAQ does not exist"});
		} else {
			res.status(200).json(data);
		}
	});
}

export const createCategories = async (req, res) => {
	let save_categories
	save_categories = new Categories({
		name: req.body.name,
		categories: req.body.categories
	});

	save_categories.save(function (err, save_categories) {
		if(err) {
			return res.status(400).json(err);
		} else {
			console.log('saved =>', save_categories);
			return res.status(200).json(save_categories);
		}
	})
};