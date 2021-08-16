import type { NextApiRequest, NextApiResponse } from "next";
import { mongooseProjectModel } from "../../../../../models/Project";
import { mongooseUserModel } from "../../../../../models/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { username, otherUsername } = req.query;

    if (!username) {
        res.status(400).send("Bad request: missing parameters: username");
        return;
    }
    if (!otherUsername) {
        res.status(400).send("Bad request: missing parameters: otherUsername");
        return;
    }
    if (username == otherUsername) {
        res.status(400).send(
            "Bad request: username is the same as otherUsername"
        );
        return;
    }

    const user = await mongooseUserModel.findOne(
        {
            username,
        },
        "following"
    );

    if (user) {
        for (let i = 0; i < user.following.length; i++) {
            if (user.following[i].username == otherUsername) {
                res.status(204).send("user follows otherUser");
                return;
            }
        }

        res.status(404).send("user doesn't follow otherUser");
        return;
    } else {
        res.status(400).send(
            "Bad request: error getting if user follows otherUser"
        );
        return;
    }
}
