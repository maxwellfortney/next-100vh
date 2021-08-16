import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const projectCommentSchema = new mongoose.Schema(
    {
        likes: { type: Number, default: 0 },
        comment: String,
        commentOwnerId: ObjectId,
        commentOwnerUsername: String,
        commentOwnerImage: String,
        projectOwnerUsername: String,
        projectTitle: String,
    },
    {
        timestamps: true,
    }
);

export const mongooseProjectCommentModel =
    mongoose.models.projectcomments ||
    mongoose.model("projectcomments", projectCommentSchema);
