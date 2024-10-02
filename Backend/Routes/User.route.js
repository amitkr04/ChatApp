import express from "express";
import {
  allUsers,
  login,
  logout,
  signup,
} from "../Controllers/User.controller.js"; //importing all functions from user controller file //signup, login, logout and allUsers functions
import secureRoute from "../Middleware/SecureRoute.js";

const router = express.Router(); //using express router to create routes //router object is created to create routes for user

router.post("/signup", signup); //creating post route for signup //signup function is called when user hit this route
router.post("/login", login); //creating post route for login //login function is called when user hit this route
router.delete("/logout", logout); //creating delete route for logout //logout function is called when user hit this route
router.get("/allUsers", secureRoute, allUsers); //creating get route for all users //secureRoute middleware is called before allUsers function //allUsers function is called when user hit this route

export default router;
