import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import Path from "path";

import UserRoute from "./Routes/User.route.js";
import messageRoute from "./Routes/Message.route.js";
import { app, server } from "./socketIO/server.js";

dotenv.config();

//middleware

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI;

try {
  mongoose.connect(URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
}
//routes
// This route handles user-related requests, such as login, registration, etc.
// All user-related endpoints will be prefixed with "/api/user"
app.use("/api/user", UserRoute);
// This route handles message-related requests (like sending and fetching messages).
// All message-related endpoints will be prefixed with "/api/message"
app.use("/api/message", messageRoute);

//-----code for deployment------
if (process.env.NODE_ENV === "production") {
  const dirPath = Path.resolve();

  app.use(express.static("./Frontend/dist"));
  app.get("*", (req, res) => {
    res.sendFile(Path.resolve(dirPath, "./Frontend/dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Chat App is Running on port ${PORT}`);
});
