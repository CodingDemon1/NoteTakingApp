const express = require("express");
const { verify } = require("../middleware/jwtAuth.middleware");
const noteRoute = express.Router();
const { noteModel } = require("../models/note.model");

noteRoute.get("/", async (req, res) => {
	try {
		let userId = req.body.userId;
		// console.log(userId);
		const data = await noteModel.find({ userId });
		// console.log(data);
		res.status(200).send(data);
	} catch (error) {
		res.status(400).send({ msg: error.message });
	}
});
noteRoute.post("/add", async (req, res) => {
	try {
		const { title, body, userId } = req.body;
		// console.log(req.body);
		const newNote = new noteModel({ title, body, userId });
		await newNote.save();
		res.status(200).send({ msg: "Note has been Added" });
	} catch (error) {
		console.log(error);
		res.status(400).send({ msg: error.message });
	}
});
noteRoute.patch("/update/:id", async (req, res) => {
	try {
		const body = req.body;
		const userId = req.body.userId;
		// let userId = req.body.userId;
		const id = req.params.id;
		const data = await noteModel.findOne({ _id: id });
		// console.log(data);
		if (data.userId == userId) {
			await noteModel.findByIdAndUpdate(id, body);

			res.status(200).send({ msg: "Note has been Updated" });
		} else {
			res.status(404).send({ msg: "Notes not Found" });
		}
	} catch (error) {
		res.status(400).send({ msg: error.message });
	}
});
noteRoute.delete("/delete/:id", async (req, res) => {
	try {
		// const id = req.params.id;
		let userId = req.body.userId;
		// console.log(userId);
		const id = req.params.id;
		const data = await noteModel.findOne({ _id: id });
		if (data.userId == userId) {
			await noteModel.findByIdAndDelete(id);
			res.status(200).send({ msg: "Note has been Deleted" });
		} else {
			res.status(404).send({ msg: "Notes not Found" });
		}
	} catch (error) {
		res.status(400).send({ msg: error.message });
	}
});
module.exports = { noteRoute };
