import mongoose from 'mongoose';

const FAQSchema = mongoose.Schema({
	question: {type: String, required: true},
	answer: {type: String, required: true},

  createdAt: { type: Date, default: Date.now()},
});

export default mongoose.model('FAQ', FAQSchema);