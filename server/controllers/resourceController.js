import path from 'path';
import Resource from '../models/resourceModel.js';
import Categories from '../models/categoriesModel.js';

import {dirname} from 'path';
import {fileURLToPath} from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

export const getCategories = async (req, res) => {
	Categories.findOne({ name: "resources"}, (err, data) => {
		res.status(200).json(data);
	});
}

export const editCategories = async (req, res) => {
	//clean messy req body
	let payload = {};
	if (req.body.categories) {
		payload.categories = req.body.categories
	}

	Categories.findOneAndUpdate({ name: "resources" }, payload, { new: true }, (err, data) => {
		if (err) {
			res.status(400).json(err);
			throw err;
		} else if (!data) {
			res.status(400).json({ message: 'Categories does not exist!'});
		} else {
			res.status(200).json(data);
		}
	});
}

export const editCategoryName = async (req, res, next) => {
		//check if misc, if so, pass
		if (req.body.original === "Misc") {
			res.status(403).json({ message: "Cannot delete Misc" });
			return;
		}

		//grab category array
		let resources = await Categories.findOne({ name: "resources" });
		let categories = resources.categories;

		//replace category in array
		//https://stackoverflow.com/questions/5915789/how-to-replace-an-item-in-an-array-with-javascript
		let index = categories.indexOf(req.body.original);
		if (index >= 0) {
			categories[index] = req.body.category;
			req.body.categories = categories;
		} else {
			res.status(400).json({message: "Category not found"});
			return;
		}

		//rename category variable in resources
		Resource.updateMany({ category: req.body.original}, { category: req.body.category }, { new: true }, (err, data) => {
			if (err) {
				res.status(400).json(err);
				throw err;
			}
		});

		//update time!
		console.log(req.body.categories);
		next();
}

export const deleteCategory = async (req, res, next) => {
	//check if misc, if so, pass
	if (req.body.category === "Misc") {
		res.status(403).json({ message: "Cannot delete Misc" });
		return;
	}

	//grab category array
	let resources = await Categories.findOne({ name: "resources" });
	let categories = resources.categories;

	//remove category from array
	let index = categories.indexOf(req.body.category);
	if (index >= 0) {
		categories.splice(index, 1);
		req.body.categories = categories;
	} else {
		res.status(400).json({ message: "Category not found" });
		return;
	}

	//move resources to Misc category
	Resource.updateMany({ category: req.body.category}, { category: "Misc" }, { new: true }, (err, data) => {
		if (err) {
			res.status(400).json(err);
			throw err;
		}
	});

	//update time!
	next();
}

export const getResourceList = async (req, res) => {
	Resource.find({}, (err, data) => {
		res.status(200).json(data);
	});
}

export const getResource = async (req, res) => {
	Resource.findOne({_id: req.params.id}, (err, data) => {
		res.status(200).json(data);
	});
}

export const createResource = async (req, res) => {
	try {
		const params = req.body;
		const resource = await Resource.create(params);
		res.status(200).type('json').send(resource);
	} catch(err) {
		res.status(403).type('json').send(err);
	}
}

export const removeResource = async (req, res) => {
	Resource.findOneAndDelete({_id: req.params.id}, (err, data) => {
		if(err) {
			res.status(400).json(err);
			throw err;
		} else if(!data) {
			res.status(400).json({
				message: "Resource does not exist!"
			});
		} else {
			res.status(200).json(data);
		}
	});
}

export const editResource = async (req, res) => {
	Resource.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, data) => {
		if (err) {
			res.status(400).json(err);
			throw err;
		} else if (!data) {
			res.status(400).json({message: "Resource does not exist"});
		} else {
			res.status(200).json(data);
		}
	});
}