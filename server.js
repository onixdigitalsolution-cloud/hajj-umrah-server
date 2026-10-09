import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import packageRoutes from "./routes/packageRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

// The server must not start without a secret key for logins
if (!process.env.JWT_SECRET) {
    console.log("JWT_SECRET is missing in the .env file. Please add it.");
    process.exit(1);
}

const app = express();

// Needed when the server runs behind a host like Render
// (so the login limiter sees the real visitor address)
app.set("trust proxy", 1);

// Websites that are allowed to talk to this server from a browser.
// CLIENT_URL can have one or more addresses, separated by commas.
const allowedOrigins = (process.env.CLIENT_URL || "")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);

app.use(
    cors({
        origin: function (origin, callback) {
            const isLocalhost = origin && /^http:\/\/localhost:\d+$/.test(origin);

            // No origin = tools like PowerShell. Listed websites + localhost are allowed.
            if (!origin || isLocalhost || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            callback(null, false);
        },
    })
);

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hajj & Umrah API is running");
});

app.get("/api/test", (req, res) => {
    res.json({ message: "Hello from the server!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/inquiries", inquiryRoutes);

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});