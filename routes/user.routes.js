const { UserModel } = require("../models/user.model");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
	try {
		// console.log(req);
		const { email, name, pass, location, age } = req.body;
		bcrypt.hash(pass, 5, async (err, hash) => {
			const newUser = new UserModel({ email, name, pass: hash, location, age });
			await newUser.save();
			res.status(200).send({ msg: "Registration Successful" });
		});
	} catch (error) {
		// console.log(error);
		res.status(400).send({ msg: "Error Ocurred" });
	}
});

userRoute.post("/login", async (req, res) => {
	try {
		// console.log(req.body);
		const { email, pass } = req.body;

		const user = await UserModel.findOne({ email });
		// console.log(pass);
		if (user) {
			// console.log(user);
			bcrypt.compare(pass, user.pass, (err, result) => {
				if (result) {
					res.status(200).send({
						msg: "Login Successful",
						token: jwt.sign({ id: user._id }, "mySecretCode"),
					});
				} else {
					res.status(400).send({ msg: "Wrong Credentials" });
				}
			});
		} else {
			res.status(400).send({ msg: "User Not Found" });
		}
	} catch (error) {
		res.status(400).send({ msg: error.message });
	}
});

module.exports = { userRoute };
