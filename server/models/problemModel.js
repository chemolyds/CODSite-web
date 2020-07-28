import mongoose from 'mongoose';

const ProblemSchema = mongoose.Schema({
	name: {type: String, required: true},
	description: {type: String, required: true, default: 'TBA'},
	category: {type: String, required: true, default: 'Misc'},

	rating: {type: Number, required: true},
	difficulty: {type: Number, required: true},
	length: {type: Number, required: true},

	problemPDFName: {type: String, required: true},
	hasSolution: {type: Boolean, required: true, default: false},
	solutionPDFName: {type: String},

  createdAt: { type: Date, default: Date.now()},
});

export default mongoose.model('problem', ProblemSchema);