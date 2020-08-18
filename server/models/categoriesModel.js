import mongoose from "mongoose";

const categoriesSchema = mongoose.Schema({
	name: { type: String, required: true },
	categories: { type: [] }
});

export default mongoose.model("Categories", categoriesSchema);