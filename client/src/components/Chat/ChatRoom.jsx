import React from 'react'
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat"
import { Card } from '@material-ui/core';


const socket = io.connect("http://localhost:5000");

export const ChatRoom = () => {
    const [username, setUsername] = useState();
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };

    return (
        <>
            { user && (<Card className="App">
                {!showChat ? (
                    <Card className="joinChatContainer">
                        <h3>Join A Chat</h3>
                        <input
                            type="text"
                            placeholder="John..."
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Room ID..."
                            onChange={(event) => {
                                setRoom(event.target.value);
                            }}
                        />
                        <button onClick={joinRoom}>Join A Room</button>
                    </Card>
                ) : (
                    <Chat socket={socket} username={username} room={room} />
                )}
            </Card>)}
        </>
    );
}
