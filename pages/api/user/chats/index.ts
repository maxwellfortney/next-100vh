/**
 * @swagger
 * /api/user/chats:
 *   get:
 *     description: Returns the authenticated 100vh user's chats
 *     responses:
 *       200:
 *         description: Returns an array of private chats
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: User does not exist
 */

import type { NextApiRequest, NextApiResponse } from "next";
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
        await dbConnect();

        const chats = await mongoosePrivateChatModel.find(
            {
                users: session.user.username,
            },
            undefined,
            {
                sort: {
                    updatedAt: -1,
                },
            }
        );

        console.log(chats);

        if (chats) {
            res.status(200).json(JSON.stringify(chats, null, 2));
            return;
        } else {
            res.status(400).json(errorMessage("Failed to get chats"));
            return;
        }
    } else {
        res.status(401).json(
            errorMessage("Unauthorized request: not signed in")
        );
        return;
    }
}
