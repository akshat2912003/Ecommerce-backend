const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS
const config = require("./config/config");
const router = require("./routes/qart/index")
const passport = require("passport");
const { jwtStrategy } = require("./config/passport");

const app = express();

// Enable CORS for all requests
app.use(cors({
    origin: "http://localhost:5173", // Allow requests from frontend
    credentials: true // Allow cookies & authorization headers
}));

mongoose.connect(config.mongoose.url).then(() => {
    console.log("Connected to MongoDB");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/verse", router);

app.get("/", (req, res) => {
    res.send("Hello, welcome to the Cart Project");
});

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
});
