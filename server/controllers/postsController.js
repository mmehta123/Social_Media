const PostMessage = require("../models/postMessage.model");

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

module.exports = { getPosts, createPost };