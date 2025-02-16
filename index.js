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
    origin: "https://ecommerce-frontend-zne5.onrender.com", // ✅ Allow only your frontend
    credentials: true, // ✅ Required when using `withCredentials: true`
    methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ Specify allowed headers
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
