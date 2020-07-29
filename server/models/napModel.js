import mongoose from 'mongoose';

const NAPSchema = mongoose.Schema({
	x: {type: Number, required: true},
	y: {type: Number, required: true},
	hasHeader: {type: Boolean, required: true, default: false},
	header: {type: String, required: false, default: ""},
	hasDescription: {type: Boolean, required: true, default: false},
	description: {type: String, required: false, default: ""},
	linkText: {type: String, required: true},
	link: {type: String, required: true},

  createdAt: { type: Date, default: Date.now()},
});

export default mongoose.model('NAP', NAPSchema);