// data model //

// Mongoose Schema defines the structure and property of the document in the MongoDB collection

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    reqired: [true, "Please provide username"],
    unique: true,
  },

  email: {
    type: String,
    reqired: [true, "Please provide email"],
    unique: true,
  },

  password: {
    type: String,
    reqired: [true, "Please provide password"],
    unique: true,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;

