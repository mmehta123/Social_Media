const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");
require("dotenv").config();
const app = express();
app.use(cors());

const postRoutes=require("./routes/posts");
const userRoutes = require("./routes/users")

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/user",userRoutes);
app.use("/posts",postRoutes);

const PORT = 5000;

const connect = () => {
    console.log("DB connection succesfull");
    return mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
}

const server = app.listen(PORT, async () => {
    try {
        await connect();
        console.log("listening on Port " + process.env.PORT);
    } catch {
        console.log("connection failed");
    }
});

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});