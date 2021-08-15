import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../utils/mongodb";
import { mongooseUserModel } from "../../../../models/User";
import { getUserByUsername } from "../../../../utils/server/user";
import { addViewToProject } from "../../../../utils/server/projects";
import { getSession } from "next-auth/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    // const session = await getSession({ req });
    const { projectId } = req.query;

    // if (!session) {
    //     res.status(401).send("Unauthorized request: no session");
    //     return;
    // }

    if (!projectId) {
        res.status(400).send("Bad request: missing parameters: projectId");
        return;
    }

    await dbConnect();

    if (addViewToProject(projectId as string)) {
        res.status(200).send(`Added view to project ${projectId}`);
        return;
    } else {
        res.status(400).send(
            `Bad request: failed to add view to project ${projectId}`
        );
        return;
    }
}
