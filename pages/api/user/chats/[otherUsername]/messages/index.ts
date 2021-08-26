/**
 * @swagger
 * /api/user/chats/{otherUsername}/message:
 *   get:
 *     description: Returns the authenticated 100vh user's chat messages with otherUsername
 *     responses:
 *       200:
 *         description: Returns the authenticated 100vh user's chat messages with otherUsername
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: Chat with otherUsername doesn't exist
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { mongoosePrivateChatModel } from "../../../../../../models/PrivateChat";
import { mongoosePrivateMessageModel } from "../../../../../../models/PrivateMessage";
import dbConnect from "../../../../../../utils/mongodb";
import { errorMessage } from "../../../../../../utils/server";

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
        if (req.method === "PUT") {
            const { message } = req.body;

            if (!message) {
                res.status(400).json(
                    errorMessage("Missing parameters: message")
                );
                return;
            }

            const chat = await mongoosePrivateChatModel.findOneAndUpdate(
                {
                    users: {
                        $all: [otherUsername, session.user.username],
                    },
                },
                {
                    $push: {
                        messages: new mongoosePrivateMessageModel({
                            from: session.user.username,
                            to: otherUsername,
                            message,
                        }),
                    },
                }
            );

            if (chat) {
                res.status(204).json(
                    JSON.stringify({ success: "Sent message" }, null, 2)
                );
            } else {
                res.status(400).json(errorMessage("Failed to send message"));
            }
        } else {
            await dbConnect();

            const chat = await mongoosePrivateChatModel.findOne(
                {
                    users: {
                        $all: [otherUsername, session.user.username],
                    },
                },
                "messages"
            );

            chat.messages = chat.messages.sort((a, b) => {
                return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                );
            });

            console.log(chat);

            if (chat) {
                res.status(200).json(JSON.stringify(chat.messages, null, 2));
                return;
            } else {
                res.status(400).json(errorMessage("Failed to get chat"));
                return;
            }
        }
    } else {
        res.status(401).json(
            errorMessage("Unauthorized request: not signed in")
        );
        return;
    }
}
