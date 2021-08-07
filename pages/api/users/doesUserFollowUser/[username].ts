import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import dbConnect from "../../../../utils/mongodb";
import { followUser, getUserByUsername } from "../../../../utils/server/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { username, toUsername } = req.query;

    if (!username && !toUsername) {
        res.status(400).send(
            "Bad request: missing parameters: username toUsername"
        );
        return;
    } else if (!username && toUsername) {
        res.status(400).send("Bad request: missing parameters: username");
        return;
    } else if (username && !toUsername) {
        res.status(400).send("Bad request: missing parameters: toUsername");
        return;
    }

    if (username == toUsername) {
        res.status(400).send("Bad request: username is the same as toUsername");
        return;
    }

    let doesFollow = false;

    const user = await getUserByUsername(username as string);
    console.log(user.following.length);

    if (user && user.following) {
        for (let i = 0; i < user.following.length; i++) {
            console.log("here");
            console.log(user.following[i].username);
            if (user.following[i].username == toUsername) {
                doesFollow = true;
            }
        }

        res.status(200).json({ doesFollow });
    } else {
        res.status(400).send("Bad request: error getting user");
    }
}
