const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 80;

app.use(cors());
dotenv.config();

mongoose.connect(
  process.env.MONGO_ATLAS_URL,
  {useNewUrlParser: true, useUnifiedTopology: true},
  () => {
    console.log("Connected to MongoDB");
  }
);

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

app.listen(port, () => {
  console.log("Backend server is running at " + port);
});
