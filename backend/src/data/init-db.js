import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

await mongoose.connect(process.env.DB_URL);
console.log("Connected to database!");
console.log();

// TODO any DB init stuff

// Disconnect when complete
await mongoose.disconnect();
console.log("Disconnected from database!");
