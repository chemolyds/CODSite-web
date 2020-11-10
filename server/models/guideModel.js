import mongoose from 'mongoose';

const GuideSchema = mongoose.Schema({
	url: { type: String, required: true },
	header: { type: String, required: true },
	description: { type: String, required: true},
	subpages: [SubpageSchema]
});

const SubpageSchema = mongoose.Schema({
	url: { type: String, required: true },
	header: { type: String, required: true },
	contents: {type: String, required: true }
});

export default mongoose.model('Guide', GuideSchema);