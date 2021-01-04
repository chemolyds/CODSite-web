import path from 'path';
import About from '../models/aboutModel.js';

import {dirname} from 'path';
import {fileURLToPath} from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

export const getAboutList = async (req, res) => {
	About.find({}, (err, data) => {
		res.status(200).json(data);
	});
}

export const getAbout = async (req, res) => {
	About.findOne({_id: req.params.ID}, (err, data) => {
		if(err) {
			res.status(400).json(err);
			throw err;
		} else if (!data) {
			res.status(400).json({
				message: "About not found!"
			});
		} else {
			res.status(200).json(data);
		}
	});
}

export const createAbout = async (req, res) => {
	let save_about
	if(req.body.thumbnail) {
		save_about = new About({
			url: req.body.url,
			thumbnail: req.body.thumbnail,
			header: req.body.header,
			description: req.body.description
		});
	} else {
		save_about = new About({
			url: req.body.url,
			header: req.body.header,
			description: req.body.description
		});
	}
	

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
	let toUpdate = {};
	if (req.body.url) toUpdate.url = req.body.url;
	if (req.body.thumbnail) toUpdate.thumbnail = req.body.thumbnail;
	if (req.body.header) toUpdate.header = req.body.header;
	if (req.body.description) toUpdate.description = req.body.description;

	About.findOneAndUpdate({_id: req.params.ID}, toUpdate, {new: true}, function(err, save_about) {
		if (err) {
			return res.status(400).json(err);
		} else {
			console.log('updated =>', save_about);
			return res.status(200).json(save_about);
		}
	});
}

export const deleteAbout = async (req, res) => {
	About.findOneAndDelete({_id: req.params.ID}, (err, data) => {
		if(err) {
			res.status(400).json(err);
		} else if (!data) {
			res.status(400).json({
				message: 'About does not exist!'
			});
		} else {
			res.status(200).json(data);
		}
	});
}

export const getSubpageList = async (req, res) => {
	About.findOne({_id: req.params.aboutID}, (err, data) => {
		if (!data) {
			res.status(400).json({
				message: 'About not found!'
			});
		} else {
			//return only child
			res.status(200).json(data.subpages);
		}
	});
}

export const getSubpage = async (req, res) => {
	//get parent
	let about = await About.findOne({_id: req.params.aboutID});
	
	//get child
	if (!about) {
		res.status(400).json({
			message: 'About does not exist!'
		});
	} else {
		let subpage = about.subpages.id(req.params.subpageID);

		if (!subpage) {
			res.status(400).json({
				message: 'Subpage does not exist!'
			});
		} else {
			res.status(200).json(subpage);
		}
	}
}

export const createSubpage = async (req, res) => {
	//get parent
	let about = await About.findOne({_id: req.params.aboutID});

	//make payload
	let payload = {
		url: req.body.url,
		header: req.body.header,
		contents: req.body.contents
	};
	if (req.body.thumbnail) payload.thumbnail = req.body.thumbnail;

	//add child
	about.subpages.push(payload);

	//save parent
	about.save(function(err, save_about) {
		if (err) {
			return res.status(400).json(err);
		} else {
			console.log('updated =>', save_about);
			return res.status(200).json(save_about);
		}
	});
}

export const editSubpage = async (req, res) => {
	//get parent and child
	let about = await About.findOne({_id: req.params.aboutID});
	let subpage = about.subpages.id(req.params.subpageID);

	//update child
	if (req.body.url) subpage.url = req.body.url;
	if (req.body.thumbnail) subpage.thumbnail = req.body.thumbnail;
	if (req.body.header) subpage.header = req.body.header;
	if (req.body.contents) subpage.contents = req.body.contents;

	//save parent
	about.save(function(err, save_about) {
		if (err) {
			return res.status(400).json(err);
		} else {
			console.log('updated =>', save_about);
			return res.status(200).json(save_about);
		}
	});
}

export const deleteSubpage = async (req, res) => {
	//get parent
	let about = await About.findOne({_id: req.params.aboutID});

	//check if about is there
	if (!about) {
		return res.status(400).json({
			message: "About does not exist!"	
		});
	}


	try {
		//remove child
		let subpage = about.subpages.id(req.params.subpageID).remove();

		//save parent
		about.save(function(err, save_about) {
			if (err) {
				return res.status(400).json(err);
			} else {
				console.log('updated =>', save_about);
				console.log('removed =>', subpage);
				return res.status(200).json(save_about);
			}
		});
	} catch (error) {
		return res.status(400).json({
			message: "Subpage does not exist!"
		});
	}
	


}