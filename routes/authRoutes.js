import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import Admin from "../models/Admin.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// Allow only 10 login tries per 15 minutes (stops password guessing)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    message: { message: "Too many login attempts. Please try again later." },
});

// POST /api/auth/login  (email + password -> token)
router.post("/login", loginLimiter, async (req, res) => {
    try {
        const email = String(req.body.email || "").trim().toLowerCase();
        const password = String(req.body.password || "");

        const admin = await Admin.findOne({ email });
        const passwordOk = admin && (await bcrypt.compare(password, admin.passwordHash));

        if (!passwordOk) {
            return res.status(401).json({ message: "Wrong email or password" });
        }

        // The token is a signed "pass" that is valid for 7 days
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ token, email: admin.email });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/auth/me  (is my token still valid?)
router.get("/me", protect, async (req, res) => {
    try {
        const admin = await Admin.findById(req.adminId).select("email");

        if (!admin) {
            return res.status(401).json({ message: "Not authorized" });
        }

        res.json({ email: admin.email });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
