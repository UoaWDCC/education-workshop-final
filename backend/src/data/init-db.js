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
const alice = new User({ username: "alice", contacts: [] });
await alice.save();

const bob = new User({ username: "bob", contacts: [] });
await bob.save();

// Disconnect when complete
await mongoose.disconnect();
console.log("Disconnected from database!");
