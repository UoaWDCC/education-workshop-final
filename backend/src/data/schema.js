import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  photoUrl: String,
  funFact: String
});

export const Contact = mongoose.model("Contacts", contactSchema);
