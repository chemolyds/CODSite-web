import mongoose from 'mongoose';

//child first
const SubpageSchema = mongoose.Schema({
	url: { type: String, required: true },
	thumbnail: {type: String, required: true, default: "https://via.placeholder.com/280x180"},
	header: { type: String, required: true },
	contents: {type: String, required: true }
});

//parent last
const AboutSchema = mongoose.Schema({
	url: { type: String, required: true },
	thumbnail: {type: String, required: true, default: "https://via.placeholder.com/280x180"},
	header: { type: String, required: true, default: "" },
	description: { type: String, required: true, default: ""},
	subpages: [SubpageSchema]
});

export default mongoose.model('About', AboutSchema);