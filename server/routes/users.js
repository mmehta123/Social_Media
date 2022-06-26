const express = require("express");
const router = express.Router();

const { signin, signup, updateUserData } = require("../controllers/userController.js")

router.post('/signup', signup);
router.post('/signin', signin);
router.patch(`/updateuserdata/:id`, updateUserData);


module.exports = router;