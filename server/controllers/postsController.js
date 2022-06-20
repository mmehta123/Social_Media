const PostMessage = require("../models/postMessage.model");
const mongoose = require("mongoose");

const getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 4;          //no.of posts per page
        const start = (Number(page) - 1) * LIMIT;     //it is the post no. eg: we are on 3rd page 1st post it will be 4(1st page)+4(1st page)+1(current post)-1(post index starts form 0)=15;
        const total = await PostMessage.countDocuments({});       //total need because we have to know the total number of pages needs to be created
        // const total =await PostMessage.find().count(); //also works 

        const postMessages = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(start);    //newest posts first
        res.status(200).json({ postMessages: postMessages, currentPage: Number(page), totalPages: Math.ceil(total / LIMIT) });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


const createPost = async (req, res) => {
    // const { creator, title, message, tags, selectedFile } = req.body;
    const post = req.body;
    try {

        const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
        await newPostMessage.save();

        return res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
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
    if (!req.userId) {
        return res.json({ message: "user unauthenticatd" });
    }
    // if user authorized then we will go further (it checked by token verification in auth.js middleware)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.send("id is not valid");
    }
    const post = await PostMessage.findById(id);
    // now we will check that our post has req.userId present in it if yes it will return its index or -1(not present)
    const index = post.likeCount.findIndex((id) => id === String(req.userId));
    // if it is not present then it will push that id to post.likes array (Liking Funtionality)
    if (index === -1) {
        post.likeCount.push(req.userId);
    } else {
        // if it is alredy present then it will remove that id from post.likes array (Unliking Functionality)
        post.likeCount = post.likeCount.filter((id) => id !== String(req.userId));
    }
    //we have to change likes model fromtype number to array and default with [] means 0 likes 
    // wrt to above code it will populate post.likes means update post by given below statement
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    return res.json(updatedPost);
}


const getPostBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, 'i');
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });
        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await PostMessage.findById(id).lean().exec();
        return res.json(post);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const commentPost = async (req, res) => {
    try {
        const {id}= req.params;
        const {value}= req.body;
        const post =await PostMessage.findById(id);

        post.Comments.push(value);
        const updatedPost= await PostMessage.findByIdAndUpdate(id, post,{new: true});
        return res.json(updatedPost);

    } catch (error) {
        return res.json({message: error});
    }
}



module.exports = { getPosts, createPost, updatePost, deletePost, likePost, getPostBySearch, getPostById, commentPost };
