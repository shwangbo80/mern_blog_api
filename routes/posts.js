const router = require("express").Router();
const Post = require("../models/Post");

//Get all posts
router.get("/all", async (req, res) => {
  try {
    const post = await Post.find().sort("createdAt").exec();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create post
router.post("/", async (req, res, next) => {
  const newPost = new Post(req.body);
  try {
    if (!req.body.title) {
      res.status(500).json("Error");
      return;
    }
    if (req.body.body.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
      res.status(500).json("Error");
      return;
    }
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update post
router.put("/:id", async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  try {
    if (post.userId === req.body.userId) {
      if (!req.body.title) {
        res.status(500).json("Error");
        return;
      }
      if (req.body.body.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
        res.status(500).json("Error");
        return;
      }
      await post.updateOne({$set: req.body});
      res.status(200).json("the post has been updated");
      return;
    } else {
      res.status(403).json("you can update only your post");
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get single comment
router.get("/:id/comments/:commentid", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post.comments.id(req.params.commentid));
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all comments in a post
router.get("/:id/comments", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post.comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Post a comment to a post
router.post("/:id/comments", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = await post.updateOne({
      $push: {comments: req.body},
    });
    res.status(200).json(`Comment successfully added`);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete a comment in a post
router.delete("/:id/comments/:commentid", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post);
    await post.comments.id(req.params.commentid).remove();
    post.save();
    res.status(200).json("Successfully deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
