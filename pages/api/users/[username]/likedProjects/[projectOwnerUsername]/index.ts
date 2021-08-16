import type { NextApiRequest, NextApiResponse } from "next";
import { mongooseUserModel } from "../../../../../../models/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const {
        username,
        projectOwnerUsername,
        perPage = 35,
        page = 0,
    } = req.query;

    if (!username) {
        res.status(400).send("Bad request: missing parameters: username");
        return;
    }
    if (!projectOwnerUsername) {
        res.status(400).send(
            "Bad request: missing parameters: projectOwnerUsername"
        );
        return;
    }

    if (parseInt(perPage as any) > 100) {
        res.status(400).send("Bad request: perPage must be under 100");
        return;
    }

    const user = await mongooseUserModel.findOne(
        {
            username,
        },
        "likedProjects"
    );

    if (user) {
        let likedProjects = [];
        likedProjects = user.likedProjects.filter(
            (like) => like.projectOwnerUsername == projectOwnerUsername
        );

        likedProjects = likedProjects.slice(
            parseInt(page as any) * parseInt(perPage as any),
            parseInt(page as any) * parseInt(perPage as any) +
                parseInt(perPage as any)
        );

        if (likedProjects.length > 0) {
            res.status(200).json(JSON.stringify(likedProjects, null, 2));
            return;
        } else {
            res.status(404).send(
                "user doesnt like any projects from otherUser"
            );
        }
    } else {
        res.status(404).send("Bad request: error getting user");
    }
}
