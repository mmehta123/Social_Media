const mongoose=require("mongoose");

const postSchema=mongoose.Schema({
    title:String,
    message: String,
    name: String,
    creator:String,
    selectedFile:String,
    tags:[String],
    likeCount:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default: new Date()
    }
});

const postMessage=mongoose.model("PostMessage",postSchema);

module.exports=postMessage;