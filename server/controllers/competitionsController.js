import path from 'path';
import Competitions from '../models/competitionsModel.js';

import {dirname} from 'path';
import {fileURLToPath} from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

export const getCompetitionsList = async (req, res) => {
	Competitions.find({}, (err, data) => {
		res.status(200).json(data);
	});
}

export const getCompetitions = async (req, res) => {
	Competitions.findOne({_id: req.params.ID}, (err, data) => {
		if(err) {
			res.status(400).json(err);
			throw err;
		} else if (!data) {
			res.status(400).json({
				message: "Competitions not found!"
			});
		} else {
			res.status(200).json(data);
		}
	});
}

export const createCompetitions = async (req, res) => {
	let save_competitions
	if(req.body.thumbnail) {
		save_competitions = new Competitions({
			url: req.body.url,
			thumbnail: req.body.thumbnail,
			header: req.body.header,
			description: req.body.description
		});
	} else {
		save_competitions = new Competitions({
			url: req.body.url,
			header: req.body.header,
			description: req.body.description
		});
	}
	

	save_competitions.save(function (err, save_competitions) {
		if (err) {
			return res.status(400).json(err);
		} else {
			console.log('saved =>', save_competitions);
			return res.status(200).json(save_competitions);
		}
	});
}

export const editCompetitions = async (req, res) => {
	let toUpdate = {};
	if (req.body.url) toUpdate.url = req.body.url;
	if (req.body.thumbnail) toUpdate.thumbnail = req.body.thumbnail;
	if (req.body.header) toUpdate.header = req.body.header;
	if (req.body.description) toUpdate.description = req.body.description;

	Competitions.findOneAndUpdate({_id: req.params.ID}, toUpdate, {new: true}, function(err, save_competitions) {
		if (err) {
			return res.status(400).json(err);
		} else {
			console.log('updated =>', save_competitions);
			return res.status(200).json(save_competitions);
		}
	});
}

export const deleteCompetitions = async (req, res) => {
	Competitions.findOneAndDelete({_id: req.params.ID}, (err, data) => {
		if(err) {
			res.status(400).json(err);
		} else if (!data) {
			res.status(400).json({
				message: 'Competitions does not exist!'
			});
		} else {
			res.status(200).json(data);
		}
	});
}

export const getSubpageList = async (req, res) => {
	Competitions.findOne({_id: req.params.competitionsID}, (err, data) => {
		if (!data) {
			res.status(400).json({
				message: 'Competitions not found!'
			});
		} else {
			//return only child
			res.status(200).json(data.subpages);
		}
	});
}

export const getSubpage = async (req, res) => {
	//get parent
	let competitions = await Competitions.findOne({_id: req.params.competitionsID});
	
	//get child
	if (!competitions) {
		res.status(400).json({
			message: 'Competitions does not exist!'
		});
	} else {
		let subpage = competitions.subpages.id(req.params.subpageID);

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
	let competitions = await Competitions.findOne({_id: req.params.competitionsID});

	//make payload
	let payload = {
		url: req.body.url,
		header: req.body.header,
		contents: req.body.contents
	};
	if (req.body.thumbnail) payload.thumbnail = req.body.thumbnail;

	//add child
	competitions.subpages.push(payload);

	//save parent
	competitions.save(function(err, save_competitions) {
		if (err) {
			return res.status(400).json(err);
		} else {
			console.log('updated =>', save_competitions);
			return res.status(200).json(save_competitions);
		}
	});
}

export const editSubpage = async (req, res) => {
	//get parent and child
	let competitions = await Competitions.findOne({_id: req.params.competitionsID});
	let subpage = competitions.subpages.id(req.params.subpageID);

	//update child
	if (req.body.url) subpage.url = req.body.url;
	if (req.body.thumbnail) subpage.thumbnail = req.body.thumbnail;
	if (req.body.header) subpage.header = req.body.header;
	if (req.body.contents) subpage.contents = req.body.contents;

	//save parent
	competitions.save(function(err, save_competitions) {
		if (err) {
			return res.status(400).json(err);
		} else {
			console.log('updated =>', save_competitions);
			return res.status(200).json(save_competitions);
		}
	});
}

export const deleteSubpage = async (req, res) => {
	//get parent
	let competitions = await Competitions.findOne({_id: req.params.competitionsID});

	//check if competitions is there
	if (!competitions) {
		return res.status(400).json({
			message: "Competitions does not exist!"	
		});
	}


	try {
		//remove child
		let subpage = competitions.subpages.id(req.params.subpageID).remove();

		//save parent
		competitions.save(function(err, save_competitions) {
			if (err) {
				return res.status(400).json(err);
			} else {
				console.log('updated =>', save_competitions);
				console.log('removed =>', subpage);
				return res.status(200).json(save_competitions);
			}
		});
	} catch (error) {
		return res.status(400).json({
			message: "Subpage does not exist!"
		});
	}
	


}