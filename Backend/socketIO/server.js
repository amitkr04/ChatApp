import { Server } from "socket.io";
import http from "http"; //importing http module to create server
import express from "express";

const app = express(); //creating express app //app object is created to use express functions and methods to create server and routes

const server = http.createServer(app); //creating server with http module and express app

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
}); //creating socket.io server with http server and cors options //cors is used to allow cross origin requests

// realtime message code goes here
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
}; //function to get receiver socket id

const users = {}; //object to store users socket id

//used to listen events on server side
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  const userId = socket.handshake.query.userId;

  if (userId) {
    users[userId] = socket.id;
    console.log("Hello ", users);
  }

  // used to send the events to all connected users
  io.emit("getOnlineUsers", Object.keys(users)); //emit event to all connected users to get online users

  //used to listen client side events emitted by server side (server and client)
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { app, io, server };
