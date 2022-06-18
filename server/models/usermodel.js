const mongoose =require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String }

});

const userModel=mongoose.model("UserModel",userSchema);
module.exports = userModel;