import mongoose from "mongoose";

export const privateMessageSchema = new mongoose.Schema(
    {
        from: {
            type: String,
            required: true,
        },
        to: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const mongoosePrivateMessageModel =
    mongoose.models.privatemessages ||
    mongoose.model("privatemessages", privateMessageSchema);
