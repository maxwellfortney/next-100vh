import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { mongooseProjectModel } from "../../../../../models/Project";

import dbConnect from "../../../../../utils/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { title, html, css, js } = req.query;

    const session = await getSession({ req });

    if (!session) {
        res.status(401).send("Unauthorized request: no session");
        return;
    }

    if (!title) {
        res.status(400).send("Bad request: missing parameters: title");
        return;
    }

    if (!html && !js) {
        res.status(400).send("Bad request: must have html and/or js");
        return;
    }

    await dbConnect();

    const newProject = new mongooseProjectModel({
        title,
        html,
        css,
        js,
        ownerUsername: (session as any).user.username,
    });
    const x = await newProject.save();

    res.status(200).json(x);
}
