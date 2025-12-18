import { Post } from "../models/post.model.js";

// create a post

const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;

    if (!name || !description || !age) {
      return res.status(400).json({
        message: "All Filed Are Required",
      });
    }
    const post = await Post.create({ name, description, age });

    res.status(201).json({
      message: "Post created Successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

const updatePost = async (req, res) => {
  //basic validation check body is empty
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        message: "no data provided for Update",
      });
    }

    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!post)
      return res.status(404).json({
        message: "Post not found",
      });
    res.status(200).json({
      message: "Post Updated Successully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Post not Found" });
    res.status(200).json({
      message: "Post Successfully Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};
export { createPost, getPosts, updatePost, deletePost };
