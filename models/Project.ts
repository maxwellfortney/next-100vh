import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    title: String,
    ownerUsername: String,
    createdAt: Date,
    updatedAt: Date,
    htmlString: String,
    cssString: String,
});

export const mongooseProjectModel =
    mongoose.models.projects || mongoose.model("projects", projectSchema);
