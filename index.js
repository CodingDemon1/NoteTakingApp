const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const { noteRoute } = require("./routes/note.routes");
const { verify } = require("./middleware/jwtAuth.middleware");
const { userRoute } = require("./routes/user.routes");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

// app.use();

app.use("/user", userRoute);
app.use("/note", verify, noteRoute);
app.listen(process.env.port, () => {
	connection();
	console.log(`Listening at ${process.env.port}`);
});
