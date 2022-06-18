const express = require("express");
const router = express.Router();
const auth=require("../middlewares/auth");

const { getPosts, createPost, updatePost, deletePost, likePost } = require("../controllers/postsController.js")

router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likepost", auth,likePost);



module.exports = router;