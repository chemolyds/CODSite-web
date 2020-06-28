import mongoose from 'mongoose';

const PageSchema = mongoose.Schema({
	page: { type: String, required: true},
	contents: { type: String, required: true},
  lastUpdated: { type: Date, default: Date.now()},
});

export default mongoose.model('page', PageSchema);