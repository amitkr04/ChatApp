import User from "../Modules/User.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../JWT/Generate.token.js";

//signup function
export const signup = async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body; //extracting data from request body

  try {
    if (password !== confirmPassword) {
      //checking if password and confirm password are same
      return res.status(400).json({ error: "Password do not match" });
    }
    const user = await User.findOne({ email }); //checking if user already exists
    if (user) {
      return res.status(400).json({ error: "User already registered" }); //if user already exists
    }

    //hash password
    const hashPassword = await bcrypt.hash(password, 10); //hashing password with 10 rounds
    const newUser = await new User({
      //creating new user with hashed password
      fullname,
      email,
      password: hashPassword,
      confirmPassword: hashPassword,
    });
    await newUser.save(); //saving user to database
    if (newUser) {
      //if user is saved successfully
      createTokenAndSaveCookie(newUser._id, res); //creating token and saving it to cookie
      return res.status(201).json({
        //returning response
        message: "User created successfully",
        user: {
          //returning user details
          _id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email,
        },
      });
    }
  } catch (error) {
    //if any error occurs while saving user
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

//login function

export const login = async (req, res) => {
  //login function with request and response parameters
  const { email, password } = req.body; //extracting email and password from request body
  try {
    const user = await User.findOne({ email }); //finding user with email in database
    const isMatch = await bcrypt.compare(password, user.password); //comparing password with hashed password
    if (!user || !isMatch) {
      //if user not found or password do not match
      return res.status(400).json({ error: "Invalid user credential" }); //returning error
    }
    createTokenAndSaveCookie(user._id, res); //creating token and saving it to cookie if user is found and password matches
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

//logout function

export const logout = async (req, res) => {
  //logout function with request and response parameters
  try {
    res.clearCookie("jwt"); //clearing cookie with jwt name to logout user
    res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

//all user function
export const allUsers = async (req, res) => {
  //all user function with request and response parameters
  try {
    const loggedInUser = req.user._id; //current logged in user id is extracted from request
    const filterUsers = await User.find({ _id: { $ne: loggedInUser } }) //finding all users except current logged in user
      .select("-password")
      .select("-confirmPassword");
    res.status(201).json(filterUsers); //returning all users except current logged in user
  } catch (error) {
    //if any error occurs
    console.log(error); //logging error to console
    res.status(500).json({ error: "Something went wrong" }); //returning error  message
  }
};
