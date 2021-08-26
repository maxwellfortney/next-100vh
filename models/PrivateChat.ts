import mongoose from "mongoose";
import { privateMessageSchema } from "./PrivateMessage";

const privateChatSchema = new mongoose.Schema(
    {
        messages: [privateMessageSchema],
        users: [String],
        title: String,
    },
    {
        timestamps: true,
    }
);

export const mongoosePrivateChatModel =
    mongoose.models.privatechats ||
    mongoose.model("privatechats", privateChatSchema);
