import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import Models from "../../../models";
import { mongooseUserModel } from "../../../models/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { username } = req.query;

    await dbConnect();

    let status = 404;

    console.log(mongoose);

    console.log(Models.User.model);

    await mongooseUserModel.findOne({ username }, function (err, user) {
        if (err) {
            status = 404;
        } else {
            status = 200;
            res.status(status).json({ isAvailable: user == null });
        }
    });
}
