import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { mongooseProjectModel } from "../../../../models/Project";
import dbConnect from "../../../../utils/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { username, title } = req.query;
    console.log("query ", req.query);

    if (!username && !title) {
        res.status(400).send("Bad request: missing parameters: username title");
        return;
    } else if (!username && title) {
        res.status(400).send("Bad request: missing parameters: username");
        return;
    } else if (username && !title) {
        res.status(400).send("Bad request: missing parameters: title");
        return;
    }

    await dbConnect();

    const project = await mongooseProjectModel.findOne({
        ownerUsername: username,
        title,
    });

    if (project) {
        res.status(200).json(JSON.stringify(project));
        return;
    } else {
        res.status(400).end();
        return;
    }
}
