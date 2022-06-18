const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const postRoutes=require("./routes/posts");
const userRoutes = require("./routes/users")

const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());


app.use("/user",userRoutes);
app.use("/posts",postRoutes);

const PORT = 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => { console.log(`connected on ${PORT}`) });
    })
    .catch((e) => { console.log(e.message) });

