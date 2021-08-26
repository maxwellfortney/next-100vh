/**
 * @swagger
 * /api/user/account:
 *   get:
 *     description: Returns the authenticated 100vh user's account
 *     responses:
 *       200:
 *         description: Returns an account object
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: User does not exist
 */

import { ObjectId } from "mongodb";
import { Schema } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { TypeORMAccountModel } from "next-auth/adapters";
import { getSession } from "next-auth/client";
import { mongoosePrivateChatModel } from "../../../../models/PrivateChat";
import dbConnect from "../../../../utils/mongodb";
import { errorMessage } from "../../../../utils/server";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const session = await getSession({ req });

    if (session) {
        const mongoose = await dbConnect();

        console.log(mongoose.models);

        let account;
        if (mongoose.models.accounts) {
            account = await mongoose.models.accounts.findOne({
                userId: new ObjectId(session.user._id),
            });
        } else {
            account = await mongoose
                .model("accounts", new Schema(TypeORMAccountModel))
                .findOne({
                    userId: new ObjectId(session.user._id),
                });
        }

        console.log("account", account);

        if (account) {
            res.status(200).json(JSON.stringify(account, null, 2));
            return;
        } else {
            res.status(400).json(errorMessage("Failed to get account"));
            return;
        }
    } else {
        res.status(401).json(
            errorMessage("Unauthorized request: not signed in")
        );
        return;
    }
}
