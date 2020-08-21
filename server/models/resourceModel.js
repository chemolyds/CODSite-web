import mongoose from 'mongoose';

const ResourceSchema = mongoose.Schema({
	name: {type: String, required: true},
	description: {type: String, required: true, default: 'TBA'},
	category: {type: String, required: true, default: 'Misc'},

	rating: {type: Number, required: true},
	difficulty: {type: Number, required: true},
	length: {type: Number, required: true},

	resourceLink: {type: String, required: true},

  createdAt: { type: Date, default: Date.now()},
});

export default mongoose.model('resource', ResourceSchema);