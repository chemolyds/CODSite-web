import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import config from '../config/config.js';

//Models
import User from '../models/userModel.js';

function initMongoose() {
  mongoose.connect(config.db.uri, {useNewUrlParser: true});
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
}

export const loginCheck = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	console.log(authHeader);
	let result;
	if (authHeader) {
		const token = req.headers.authorization.split(' ')[0]; // Bearer <token>
		const options = {expiresIn: '360000'};
		try {
			// verify makes sure that the token hasn't expired and has been issued by us
			result = jwt.verify(token, 'jerdan1980', options);
			console.log(result)
			//pass decoded token to the req obj
			req.decoded = result;
			//move on
			next();
		} catch (err) {
			console.log('ERROR from auth.js:', err);
			res.status(400).json(err);
			throw new Error(err);
		}
	} else {
		res.status(401).json({err: 'Auth error. Token reqired.'});
	}
}

export const adminCheck = async (req, res, next) => {
	initMongoose()
	let result = await User.findOne({_id: req.decoded.user_info.id})
	if (result.isAdmin) {
		next();
	} else {
		res.status(400).json({err: "not an admin"});
	}
}