/**
 * @swagger
 * /api/users/{username}/lastOnline:
 *   parameters:
 *     - name: username
 *       in: path
 *       description: username of user
 *       required: true
 *       schema:
 *         type: string
 *   get:
 *     description: Returns the date string of when the user was last online
 *     responses:
 *       200:
 *         description: Returns the date string of when the user was last online
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
        res.status(400).json(errorMessage("Missing parameters: username"));
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
        "followers"
    );

    if (user) {
        const followers = user.followers
            .slice(
                parseInt(page as any) * parseInt(perPage as any),
                parseInt(page as any) * parseInt(perPage as any) +
                    parseInt(perPage as any)
            )
            .sort((a, b) => {
                return (
                    new Date(b.followedAt).getTime() -
                    new Date(a.followedAt).getTime()
                );
            });

        if (followers) {
            res.status(200).json(JSON.stringify(followers, null, 2));
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
