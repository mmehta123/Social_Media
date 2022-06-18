const PostMessage = require("../models/postMessage.model");
const mongoose = require("mongoose");

const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find().lean().exec();
        res.status(200).json(postMessages);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


const createPost = async (req, res) => {
    // const { creator, title, message, tags, selectedFile } = req.body;
    const post = req.body;
    try {

        const newPostMessage = new PostMessage({...post, creator:req.userId ,createdAt:new Date().toISOString()});
        await newPostMessage.save();

        return res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message});
    }
};


const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("id is not valid");
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
    return res.json(updatedPost);
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("id is not valid");
    }

    await PostMessage.findByIdAndRemove(id);
    return res.json({ message: "Post deleted successfully" });

}

const likePost = async (req, res) => {

    const { id } = req.params;
    //req.userId is coming from middleware auth if it is not present it will return the given msg 
    if(!req.userId){
        return res.json({message:"user unauthenticatd"});
    }
    // if user authorized then we will go further (it checked by token verification in auth.js middleware)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.send("id is not valid");
    }
    const post = await PostMessage.findById(id);
    // now we will check that our post has req.userId present in it if yes it will return its index or -1(not present)
    const index=post.likeCount.findIndex((id)=>id===String(req.userId));
    // if it is not present then it will push that id to post.likes array (Liking Funtionality)
    if(index===-1){
        post.likeCount.push(req.userId);
    }else{
            // if it is alredy present then it will remove that id from post.likes array (Unliking Functionality)
        post.likeCount = post.likeCount.filter((id) => id !== String(req.userId));
    }
    //we have to change likes model fromtype number to array and default with [] means 0 likes 
    // wrt to above code it will populate post.likes means update post by given below statement
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post,{new :true});
    return res.json(updatedPost);
}

module.exports = { getPosts, createPost, updatePost, deletePost, likePost };
