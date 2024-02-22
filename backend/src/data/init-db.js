import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { User } from "./schema.js";

await mongoose.connect(process.env.DB_URL);
console.log("Connected to database!");
console.log();

// Clear database
await User.deleteMany({});

// TODO any DB init stuff
const alice = new User({
  username: "alice",
  contacts: [
    {
      name: "Ash Ketchum",
      phoneNumber: "+1234567890",
      photoUrl: null,
      funFact: "Ash has a goal to become a Pokémon Master."
    },
    {
      name: "Misty Waterflower",
      phoneNumber: "+0987654321",
      photoUrl: null,
      funFact: "Misty specializes in water-type Pokémon."
    },
    {
      name: "Brock Slate",
      phoneNumber: "+1123456789",
      photoUrl: null,
      funFact: "Brock dreams of becoming the greatest Pokémon breeder."
    }
  ]
});
await alice.save();

const bob = new User({
  username: "bob",
  contacts: [
    {
      name: "Rick Sanchez",
      phoneNumber: "+15555555501",
      photoUrl: null,
      funFact: "Rick is known for his eccentric and ingenious inventions."
    },
    {
      name: "Morty Smith",
      phoneNumber: "+15555555502",
      photoUrl: null,
      funFact: "Morty often finds himself reluctantly involved in his grandfather's adventures."
    },
    {
      name: "Summer Smith",
      phoneNumber: "+15555555503",
      photoUrl: null,
      funFact:
        "Summer is quick-witted and sometimes more aware than Morty of the risks in Rick's adventures."
    }
  ]
});
await bob.save();

// Disconnect when complete
await mongoose.disconnect();
console.log("Disconnected from database!");
