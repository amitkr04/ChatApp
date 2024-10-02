import express from "express";
import { getMessage, sendMessage } from "../Controllers/Message.controller.js";
import secureRoute from "../Middleware/SecureRoute.js";

const router = express.Router();
router.post("/send/:id", secureRoute, sendMessage); //send message to user with id //secureRoute middleware is called before sendMessage function //sendMessage function is called when user hit this route
router.get("/get/:id", secureRoute, getMessage); //get messages of user with id //secureRoute middleware is called before getMessage function //getMessage function is called when user hit this route

export default router;
