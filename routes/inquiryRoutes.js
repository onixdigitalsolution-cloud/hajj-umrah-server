import express from "express";
import Inquiry from "../models/Inquiry.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// POST /api/inquiries  (PUBLIC: the booking form sends the customer's details here)
router.post("/", async (req, res) => {
    try {
        const { name, phone, email, service, travelDate, message } = req.body;

        if (!name || !phone || !service) {
            return res.status(400).json({ message: "Name, phone and service are required" });
        }

        const inquiry = await Inquiry.create({ name, phone, email, service, travelDate, message });

        res.status(201).json({ message: "Inquiry saved", id: inquiry._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET /api/inquiries  (ADMIN ONLY: all inquiries, newest first)
router.get("/", protect, async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PATCH /api/inquiries/:id  (ADMIN ONLY: change status -> new / contacted / closed)
router.patch("/:id", protect, async (req, res) => {
    try {
        const inquiry = await Inquiry.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { returnDocument: "after", runValidators: true }
        );

        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry not found" });
        }

        res.json(inquiry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/inquiries/:id  (ADMIN ONLY)
router.delete("/:id", protect, async (req, res) => {
    try {
        const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry not found" });
        }

        res.json({ message: "Inquiry deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
