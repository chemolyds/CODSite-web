import mongoose from 'mongoose';

const AboutSchema = mongoose.Schema({
	name: { type: String, required: true, default: 'about'},
	contents: { type: String, required: true},
  lastUpdated: { type: Date, default: Date.now()},
});

export default mongoose.model('about', AboutSchema);