import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { mongooseProjectModel } from "../../../../../../../models/Project";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { username, title } = req.query;

    if (!username) {
        res.status(400).send("Bad request: missing parameters: username");
        return;
    }

    if (!title) {
        res.status(400).send("Bad request: missing parameters: title");
        return;
    }

    if (req.method === "POST") {
        const project = await mongooseProjectModel.findOneAndUpdate(
            {
                ownerUsername: username,
                title: title,
            },
            {
                $inc: { views: 1 },
            }
        );

        if (project) {
            res.status(204).send("Added view to project");
            return;
        } else {
            res.status(400).send("Bad request: error getting project");
        }
    } else {
        const project = await mongooseProjectModel.findOne(
            {
                ownerUsername: username,
                title: title,
            },
            "views"
        );

        if (project) {
            res.status(200).json(
                JSON.stringify({ views: project.views }, null, 2)
            );
            return;
        } else {
            res.status(404).send("Bad request: error getting project");
        }
    }
}
