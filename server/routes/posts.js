const express = require("express");
const router = express.Router();
const auth=require("../middlewares/auth");

const { getPosts, createPost, updatePost, deletePost, likePost,getPostBySearch } = require("../controllers/postsController.js")

router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likepost", auth,likePost);

router.get("/search", getPostBySearch);



module.exports = router;