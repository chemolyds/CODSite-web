import mongoose from 'mongoose';
import ProblemModel from '../models/ProblemModel.js';
import config from '../config/config.js';

mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});
ProblemModel.deleteMany({}, (err) => {
	if (err) throw err;
	else {
		mongoose.connection.close();
		console.log("emptied Problems");
	}
});
