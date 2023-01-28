const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 20,
      required: true,
    },
    comment: {
      type: String,
      max: 100,
      required: true,
    },
  },
  {timestamps: true}
);

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      max: 100,
      required: true,
    },
    category: {
      type: String,
      max: 50,
      required: true,
    },
    body: {
      type: String,
      max: 500,
      required: true,
    },
    img: {
      type: String,
    },
    comments: [commentSchema],
  },
  {timestamps: true}
);

module.exports = mongoose.model("Post", postSchema);
