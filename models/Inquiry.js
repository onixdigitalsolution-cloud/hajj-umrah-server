import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, maxlength: 100 },
        phone: { type: String, required: true, trim: true, maxlength: 30 },
        email: { type: String, trim: true, maxlength: 100, default: "" },
        service: { type: String, required: true, trim: true, maxlength: 100 },
        travelDate: { type: String, trim: true, maxlength: 50, default: "" },
        message: { type: String, trim: true, maxlength: 1000, default: "" },
        status: { type: String, enum: ["new", "contacted", "closed"], default: "new" },
    },
    { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;