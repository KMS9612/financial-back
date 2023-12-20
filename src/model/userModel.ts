import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password_hashed: { type: String, require: true },
});

export const User = mongoose.model("User", userSchema);
