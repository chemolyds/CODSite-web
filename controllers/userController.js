import mongoose from 'mongoose';
import config from '../config/config.js';

//Models
import About from '../models/aboutModel.js';

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
