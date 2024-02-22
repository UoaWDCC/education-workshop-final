import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: String,
  photoUrl: String,
  funFact: String
});

export const Contact = mongoose.model("Contacts", contactSchema);
