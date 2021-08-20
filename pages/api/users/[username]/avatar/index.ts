/**
 * @swagger
 * /api/users/{username}/avatar:
 *   parameters:
 *     - name: username
 *       in: path
 *       description: username of user
 *       required: true
 *       schema:
 *         type: string
 *   get:
 *     description: Returns the avatar of a 100vh user
 *     responses:
 *       200:
 *         description: Returns an avatar image
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
    const { username } = req.query;

    if (!username) {
        res.status(400).json(errorMessage("Missing username parameter"));
        return;
    }

    await dbConnect();

    const user = await mongooseUserModel.findOne(
        {
            username,
        },
        "image"
    );

    if (user) {
        if (user.image) {
            res.status(200).json(
                JSON.stringify({ image: user.image }, null, 2)
            );
            return;
        } else {
            res.status(400).json(errorMessage("Error getting user's avatar"));
            return;
        }
    } else {
        res.status(404).json(errorMessage("User doesn't exists"));
        return;
    }
}
