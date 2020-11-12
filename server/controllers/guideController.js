import path from 'path';
import Guide from '../models/GuideModel.js';

import {dirname} from 'path';
import {fileURLToPath} from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

export const getGuideList = async (req, res) => {
	Guide.find({}, (err, data) => {
		res.status(200).json(data);
	});
}

export const getGuide = async (req, res) => {
	Guide.findOne({_id: req.params.ID}, (err, data) => {
		if(err) {
			res.status(400).json(err);
			throw err;
		} else if (!data) {
			res.status(400).json({
				message: "Guide not found!"
			});
		} else {
			res.status(200).json(data);
		}
	});
}

export const createGuide = async (req, res) => {
	let save_guide
	save_guide = new Guide({
		url: req.body.url,
		thumbnail: req.body.thumbnail,
		header: req.body.header,
		description: req.body.description
	});

	save_guide.save(function (err, save_guide) {
		if (err) {
			return res.statsu(400).json(err);
		} else {
			console.log('saved =>', save_guide);
			return res.status(200).json(save_guide);
		}
	});
}

export const editGuide = async (req, res) => {
	let toUpdate = {};
	if (req.body.url) toUpdate.url = req.body.url;
	if (req.body.thumbnail) toUpdate.thumbnail = req.body.thumbnail;
	if (req.body.header) toUpdate.header = req.body.header;
	if (req.body.description) toUpdate.description = req.body.description;

	Guide.findOneAndUpdate({_id: req.params.ID}, toUpdate, {new: true}, function(err, save_guide) {
		if (err) {
			return res.status(400).json(err);
		} else {
			console.log('updated =>', save_guide);
			return res.status(200).json(save_guide);
		}
	});
}

export const deleteGuide = async (req, res) => {
	Guide.findOneAndDelete({_id: req.params.ID}, (err, data) => {
		if(err) {
			res.status(400).json(err);
		} else if (!data) {
			res.status(400).json({
				message: 'Guide does not exist!'
			});
		} else {
			res.status(200).json(data);
		}
	});
}

export const getSubpageList = async (req, res) => {
	Guide.findOne({_id: req.params.guideID}, (err, data) => {
		if (!data) {
			res.status(400).json({
				message: 'Guide not found!'
			});
		} else {
			//return only child
			res.status(200).json(data.subpages);
		}
	});
}

export const getSubpage = async (req, res) => {
	//get parent
	let guide = await Guide.findOne({_id: req.params.guideID});
	
	//get child
	if (!guide) {
		res.status(400).json({
			message: 'Guide does not exist!'
		});
	} else {
		let subpage = guide.subpages.id(req.params.subpageID);

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
	let guide = await Guide.findOne({_id: req.params.guideID});

	//add child
	guide.subpages.push({
		url: req.body.url,
		thumbnail: req.body.thumbnail,
		header: req.body.header,
		contents: req.body.contents
	});

	//save parent
	guide.save(function(err, save_guide) {
		if (err) {
			return res.status(400).json(err);
		} else {
			console.log('updated =>', save_guide);
			return res.status(400).json(save_guide);
		}
	});
}

export const editSubpage = async (req, res) => {
	//get parent and child
	let guide = await Guide.findOne({_id: req.params.guideID});
	let subpage = guide.subpages.id(req.params.subpageID);

	//update child
	if (req.body.url) subpage.url = req.body.url;
	if (req.body.thumbnail) subpage.thumbnail = req.body.thumbnail;
	if (req.body.header) subpage.header = req.body.header;
	if (req.body.contents) subpage.contents = req.body.contents;

	//save parent
	guide.save(function(err, save_guide) {
		if (err) {
			return res.status(400).json(err);
		} else {
			console.log('updated =>', save_guide);
			return res.status(200).json(save_guide);
		}
	});
}

export const deleteSubpage = async (req, res) => {
	//get parent
	let guide = await Guide.findOne({_id: req.params.guideID});

	//check if guide is there
	if (!guide) {
		return res.status(400).json({
			message: "Guide does not exist!"	
		});
	}


	try {
		//remove child
		let subpage = guide.subpages.id(req.params.subpageID).remove();

		//save parent
		guide.save(function(err, save_guide) {
			if (err) {
				return res.status(400).json(err);
			} else {
				console.log('updated =>', save_guide);
				console.log('removed =>', subpage);
				return res.status(200).json(save_guide);
			}
		});
	} catch (error) {
		return res.status(400).json({
			message: "Subpage does not exist!"
		});
	}
	


}