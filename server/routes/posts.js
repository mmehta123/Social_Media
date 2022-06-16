const express = require("express");
const router = express.Router();

const { getPosts, createPost, updatePost, deletePost, likePost } = require("../controllers/postsController.js")

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likepost", likePost);



module.exports = router;