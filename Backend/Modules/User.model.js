import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  // create schema for user model with fullname, email, password and confirmPassword fields with required and unique properties
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // createAt & updateAt

const User = mongoose.model("User", userSchema); // create model with userSchema and export it to use in other files //model name is User and schema is userSchema //model name should be singular and first letter should be capital
export default User;
