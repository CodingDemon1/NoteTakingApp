const mongoose = require("mongoose");
const noteSchema = mongoose.Schema({
	title: String,
	body: String,
	userId: String,
});

const noteModel = mongoose.model("note", noteSchema);

module.exports = { noteModel };
