import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/mongodb";
import Models from "../../../models";
import { mongooseUserModel } from "../../../models/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { username } = req.query;

    if (!username) {
        res.status(400).send("Bad request: missing parameters: username");
        return;
    }

    await dbConnect();

    const user = await mongooseUserModel.findOne({ username });

    res.status(200).json({ isAvailable: user == null });
}
