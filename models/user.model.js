const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
	email: String,
	name: String,
	pass: String,
	location: String,
	age: Number,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
