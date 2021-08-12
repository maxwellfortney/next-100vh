import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import dbConnect from "../../../../utils/mongodb";
import { mongooseUserModel } from "../../../../models/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { newUsername } = req.query;

    const session = await getSession({ req });

    if (!session) {
        res.status(401).send("Unauthorized request: no session");
        return;
    }

    if (!newUsername) {
        res.status(400).send("Bad request: missing parameters: newUsername");
        return;
    }

    if (session) {
        await dbConnect();

        const userQuery = await mongooseUserModel.findOneAndUpdate(
            { email: session.user?.email },
            { username: newUsername }
        );

        if (userQuery) {
            await userQuery.save();
            console.log(await getSession({ req }));
            res.redirect(200, "/");
        } else {
            res.status(400);
        }
    } else {
        res.status(401);
    }

    // res.end();
}
