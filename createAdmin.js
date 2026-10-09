import readline from "readline/promises";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

// Ask for the email and password in the terminal
// (so the password is never written inside a file)
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const email = (await rl.question("Admin email: ")).trim().toLowerCase();
const password = await rl.question("Admin password (at least 8 characters): ");
rl.close();

if (!email || password.length < 8) {
    console.log("Email is required and the password must be at least 8 characters.");
    process.exit(1);
}

try {
    await mongoose.connect(process.env.MONGO_URI);

    // Only a scrambled version (hash) of the password is saved
    const passwordHash = await bcrypt.hash(password, 10);

    // If this email already exists the password is replaced, otherwise a new admin is created
    await Admin.findOneAndUpdate({ email }, { email, passwordHash }, { upsert: true });

    console.log("Admin saved: " + email);
} catch (error) {
    console.log("Error:", error.message);
} finally {
    await mongoose.disconnect();
}
