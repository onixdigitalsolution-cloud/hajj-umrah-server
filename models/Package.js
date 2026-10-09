import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
    {
        slug: { type: String, required: true, unique: true, trim: true },
        type: { type: String, required: true, enum: ["hajj", "umrah"] },
        label: { type: String, required: true, trim: true },
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        image: { type: String, default: "pkg1.png" },
        featured: { type: Boolean, default: false },
        features: { type: [String], default: [] },
        duration: { type: String, required: true },
        makkahNights: { type: String, required: true },
        madinahNights: { type: String, required: true },
        price: { type: String, required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);

export default Package;