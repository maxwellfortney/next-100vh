import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../utils/mongodb";
import { mongooseUserModel } from "../../../../models/User";
import { getUserByUsername } from "../../../../utils/server/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { username, projectId } = req.query;

    if (!username && !projectId) {
        res.status(400).send(
            "Bad request: missing parameters: username projectId"
        );
        return;
    } else if (!username && projectId) {
        res.status(400).send("Bad request: missing parameters: username");
        return;
    } else if (username && !projectId) {
        res.status(400).send("Bad request: missing parameters: projectId");
        return;
    }

    await dbConnect();
    const user = await getUserByUsername(username as string);

    if (user) {
        let userDidLike = false;

        user.projectLikes.forEach((like) => {
            if (like.projectId == projectId) {
                userDidLike = true;
                console.log("userDidLike", userDidLike);

                res.status(200).json(JSON.stringify(userDidLike));
            }
        });

        if (!userDidLike) {
            console.log("userDidLike", userDidLike);
            res.status(200).json(JSON.stringify(userDidLike));
        }
    }
}
