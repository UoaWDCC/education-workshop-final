import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { Contact } from "./schema.js";

await mongoose.connect(process.env.DB_URL);
console.log("Connected to database!");
console.log();

// Clear database
await Contact.deleteMany({});

const response = await fetch("https://randomuser.me/api/?results=5");
const data = await response.json();
const dummyContacts = data.results.map((r) => ({
  name: `${r.name.first} ${r.name.last}`,
  phoneNumber: r.cell,
  photoUrl: r.picture.large,
  funFact: "Lorem ipsum..."
}));

await Contact.bulkSave(dummyContacts.map((c) => new Contact(c)));

// Disconnect when complete
await mongoose.disconnect();
console.log("Disconnected from database!");
