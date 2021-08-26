/**
 * @swagger
 * /api/user/chats/{otherUsername}:
 *   get:
 *     description: Returns the authenticated 100vh user's chat with otherUsername
 *     responses:
 *       200:
 *         description: Returns the authenticated 100vh user's chat with otherUsername
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: Chat with otherUsername doesn't exist
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { mongoosePrivateChatModel } from "../../../../../models/PrivateChat";
import dbConnect from "../../../../../utils/mongodb";
import { errorMessage } from "../../../../../utils/server";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { otherUsername } = req.query;

    if (!otherUsername) {
        res.status(400).json(errorMessage("Missing parameters: otherUsername"));
        return;
    }

    const session = await getSession({ req });

    if (otherUsername == session?.user.username) {
        res.status(400).json(
            errorMessage("User cant have a chat with themself")
        );
        return;
    }

    if (session) {
        await dbConnect();

        const chat = await mongoosePrivateChatModel.findOne({
            users: {
                $all: [otherUsername, session.user.username],
            },
        });

        console.log(chat);

        if (chat) {
            res.status(200).json(JSON.stringify(chat, null, 2));
            return;
        } else {
            res.status(400).json(errorMessage("Failed to get chat"));
            return;
        }
    } else {
        res.status(401).json(
            errorMessage("Unauthorized request: not signed in")
        );
        return;
    }
}
