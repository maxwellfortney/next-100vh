/**
 * @swagger
 * /api/user:
 *   get:
 *     description: Returns the authenticated 100vh user
 *     responses:
 *       200:
 *         description: Returns a single 100vh user object
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: User does not exist
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import dbConnect from "../../../utils/mongodb";
import { errorMessage } from "../../../utils/server";
import { getUserByUsername } from "../../../utils/server/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const session = await getSession({ req });

    if (session) {
        await dbConnect();

        const user = await getUserByUsername(session.user.username as string);

        if (user) {
            res.status(200).json(JSON.stringify(user, null, 2));
            return;
        } else {
            res.status(404).json(errorMessage("User doesn't exists"));
            return;
        }
    } else {
        res.status(401).json(
            errorMessage("Unauthorized request: not signed in")
        );
        return;
    }
}
