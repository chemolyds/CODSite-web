import * as fs from 'fs'; 
import assert from 'assert';
import mongodb from 'mongodb';
//import ProblemModel from '../models/problemModel.js';
import config from '../config/config.js';

//http://mongodb.github.io/node-mongodb-native/3.1/tutorials/gridfs/streaming/
const client = new mongodb.MongoClient(config.db.uri);

client.connect(function(error) {
	assert.ifError(error);

	const db = client.db();

	var bucket = new mongodb.GridFSBucket(db);

	//grab all the files
	const files = fs.readdirSync('./problems').filter(file => file.endsWith('.pdf'));
	let counter = 0;
	for(const file of files) {
		fs.createReadStream(`./problems/${file}`)
			.pipe(bucket.openUploadStream(`${file}`))
			.on('error', function(error) {
				assert.ifError(error);
			})
			.on('finish', function() {
				counter++;
				console.log('Success => ', file, `${counter}/${files.length}`);
				if(counter === files.length) {
					console.log("DONE!");
					client.close();
				}
			});
	}
});