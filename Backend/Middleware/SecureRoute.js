import jwt from "jsonwebtoken"; //importing jsonwebtoken package
import User from "../Modules/User.model.js"; //importing User model

const secureRoute = async (req, res, next) => {
  //middleware function to check if user is authenticated or not before accessing protected routes //async function with request, response and next parameters
  try {
    const token = req.cookies.jwt; //extracting token from cookie //jwt is the name of cookie where token is saved //cookie is sent with every request to server
    if (!token) {
      return res.status(401).json({ error: "No token, Unauthorized access" });
    }
    const decoded = jwt.verify(token, process.env.JWT_TOKEN); //verifying token with jwt token from environment variable //if token is valid it will return decoded data otherwise it will throw error //decoded data contains user id which is used to find user
    if (!decoded) {
      return res
        .status(401)
        .json({ error: "Invalid token, Unauthorized access" });
    }
    const user = await User.findById(decoded.userId) //finding user with user id from decoded data //if user is found it will return user otherwise it will return null
      .select("-password")
      .select("-confirmPassword"); //current logged in user
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user; //setting user to request object //user is set to request object so that it can be accessed in other routes
    next(); //calling next function to move to next middleware or route
  } catch (error) {
    console.log("Error in secureRoute:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default secureRoute;
