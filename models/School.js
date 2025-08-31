import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        contact: { type: String },
        number: { type: String },
        image: { type: String },
        email_id: { type: String, match: /^\S+@\S+$/i },
    },
    { timestamps: true }
);

export default mongoose.models.School || mongoose.model("School", SchoolSchema);
