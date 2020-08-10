import mongoose from 'mongoose';

const PageSchema = mongoose.Schema({
	page: { type: String, required: true},
	header: {type: String, required: true, default: ""},
	contents: { type: String, required: true},
	hidden: { type: Boolean, required: true, default: false},
  lastUpdated: { type: Date, default: Date.now()},
});

export default mongoose.model('page', PageSchema);