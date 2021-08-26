/**
 * @swagger
 * /api/users/{username}/following:
 *   parameters:
 *     - name: username
 *       in: path
 *       description: username of user
 *       required: true
 *       schema:
 *         type: string
 *     - name: perPage
 *       in: query
 *       schema:
 *         type: integer
 *         minimum: 1
 *         maximum: 100
 *     - name: page
 *       in: query
 *       schema:
 *         type: integer
 *         minimum: 0
 *   get:
 *     description: Returns the following of a 100vh user
 *     responses:
 *       200:
 *         description: Returns an array of a users whom a user is following
 *       400:
 *         description: Invalid parameters
 *       404:
 *         description: User does not exist
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { mongooseUserModel } from "../../../../../models/User";
import dbConnect from "../../../../../utils/mongodb";
import { errorMessage } from "../../../../../utils/server";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { username, perPage = 35, page = 0 } = req.query;

    if (!username) {
        res.status(400).json(errorMessage("Missing username parameter"));
        return;
    }

    if (parseInt(perPage as any) > 100 || parseInt(perPage as any) < 1) {
        res.status(400).json(
            errorMessage("perPage can't be greater than 100 or less than 1")
        );
        return;
    }

    if (parseInt(page as any) < 0) {
        res.status(400).json(errorMessage("page can't be below 0"));
        return;
    }

    await dbConnect();

    const user = await mongooseUserModel.findOne(
        {
            username,
        },
        "following"
    );

    if (user) {
        const following = user.following
            .sort((a, b) => {
                return (
                    new Date(b.followedAt).getTime() -
                    new Date(a.followedAt).getTime()
                );
            })
            .slice(
                parseInt(page as any) * parseInt(perPage as any),
                parseInt(page as any) * parseInt(perPage as any) +
                    parseInt(perPage as any)
            );

        if (following) {
            res.status(200).json(JSON.stringify(following, null, 2));
            return;
        } else {
            res.status(400).json(
                errorMessage("Error getting user's followers")
            );
            return;
        }
    } else {
        res.status(404).json(errorMessage("User doesn't exists"));
        return;
    }
}
