import express from "express";
import Package from "../models/Package.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// GET /api/packages  (public: all visible packages; add ?type=hajj or ?type=umrah to filter)
router.get("/", async (req, res) => {
    try {
        const filter = { isActive: true };
        if (req.query.type) filter.type = req.query.type;

        const packages = await Package.find(filter).sort({ createdAt: 1 });
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/packages/admin/all  (ADMIN ONLY: every package, even hidden ones)
router.get("/admin/all", protect, async (req, res) => {
    try {
        const packages = await Package.find().sort({ createdAt: 1 });
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/packages/hajj-premium  (public: one package)
router.get("/:slug", async (req, res) => {
    try {
        const pkg = await Package.findOne({ slug: req.params.slug });

        if (!pkg) {
            return res.status(404).json({ message: "Package not found" });
        }

        res.json(pkg);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/packages  (ADMIN ONLY: create a new package)
router.post("/", protect, async (req, res) => {
    try {
        const pkg = await Package.create(req.body);
        res.status(201).json(pkg);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /api/packages/hajj-premium  (ADMIN ONLY: edit a package)
router.put("/:slug", protect, async (req, res) => {
    try {
        const pkg = await Package.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { returnDocument: "after", runValidators: true }
        );

        if (!pkg) {
            return res.status(404).json({ message: "Package not found" });
        }

        res.json(pkg);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/packages/hajj-premium  (ADMIN ONLY: delete a package)
router.delete("/:slug", protect, async (req, res) => {
    try {
        const pkg = await Package.findOneAndDelete({ slug: req.params.slug });

        if (!pkg) {
            return res.status(404).json({ message: "Package not found" });
        }

        res.json({ message: "Package deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
