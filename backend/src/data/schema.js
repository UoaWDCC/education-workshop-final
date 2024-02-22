import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  contacts: [{ name: String, phoneNumber: String, photoUrl: String, funFact: String }]
});

export const User = mongoose.model("Users", userSchema);
