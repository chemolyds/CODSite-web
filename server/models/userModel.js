import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	username: { type: String, required: true},
	password: { type: String, required: true},
	isAdmin: {type: Boolean, required: true, default: false},
  lastUpdated: { type: Date, default: Date.now()},
});

export default mongoose.model('user', userSchema);