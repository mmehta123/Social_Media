const UserModel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({ message: "user does not exist", status: false })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.json({ message: "Invalid credentials ", status: false });
        }
        const token = jwt.sign({ email: user.email, id: user._id }, 'test', { expiresIn: "1h" });
        return res.json({ result: user, token, status: true });
    } catch (error) {
        return res.json({ message: "something went wrong", status: false });
    }
}

const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email }).lean().exec();
        if (existingUser) {
            return res.json({ message: "user already exists", status: false });
        }
        if (password !== confirmPassword) {
            return res.json({ message: "Password mismatch", status: false });
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await UserModel.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        const token = jwt.sign({ email: user.email, id: user._id }, 'test', { expiresIn: "1h" });
        return res.json({ result: user, token, status: true });
    } catch (error) {
        return res.json({ message: "something went wrong", status: false });
    }
}

const updateUserData = async (req, res) => {
    try {
        const data = req.body;
        const { id } = req.params;
       const user= await UserModel.findByIdAndUpdate(id, data,{new: true });
        const token = jwt.sign({ email: user.email, id: user._id }, 'test', { expiresIn: "1h" });
        return res.json({ result: user,token, message: "Profile inforamtion updated successfully", status: true });

    } catch (error) { console.log(error); return res.json({ message: "something went wrong", status: false }); }

}


module.exports = { signin, signup, updateUserData }
