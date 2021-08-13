import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { mongooseProjectModel } from "../../../../../models/Project";

import dbConnect from "../../../../../utils/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const session = await getSession({ req });

    if (!session) {
        res.status(401).send("Unauthorized request: no session");
        return;
    }

    await dbConnect();

    const projectTitles = await mongooseProjectModel.find(
        {
            ownerUsername: (session as any).user.username,
        },
        "title"
    );

    res.status(200).json(parseTitles(projectTitles));
}

function parseTitles(projectTitles: Array<any>) {
    const ret: Array<string> = [];

    for (let i = 0; i < projectTitles.length; i++) {
        ret.push(projectTitles[i].title);
    }

    return ret;
}
