import jwt from "jsonwebtoken"; //importing jsonwebtoken package

const createTokenAndSaveCookie = (userId, res) => {
  //function to create token and save it to cookie
  //   const { userId } = user;
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    //creating token with user id and jwt token from environment variable and setting expiry time to 10 days
    expiresIn: "10d",
  });
  res.cookie("jwt", token, {
    //saving token to cookie with jwt name and setting httpOnly, secure and sameSite properties
    httpOnly: true, //xss // Prevent client-side JavaScript from accessing the token
    // secure: true,
    secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
    sameSite: "strict", //csrf // Prevent cross-site request forgery
  });
};

export default createTokenAndSaveCookie; //exporting function to use in other files
