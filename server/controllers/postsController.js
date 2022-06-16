const PostMessage = require("../models/postMessage.model");
const mongoose= require("mongoose");

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
        // const newPostMessage = await PostMessage.create({
        //     creator, title, message, tags,selectedFile
        // });   
        // console.log(newPostMessage);    

        // OR

        const newPostMessage = new PostMessage(post);
        await newPostMessage.save();

        return res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message + " abc" });
    }
};


const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("id is not valid");
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post,_id}, { new: true });
    return res.json(updatedPost);
}

module.exports = { getPosts, createPost, updatePost };
