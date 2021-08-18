/**
 * @swagger
 * /api/users/{username}/following/{otherUsername}:
 *   parameters:
 *     - name: username
 *       in: path
 *       description: username of user
 *       required: true
 *       schema:
 *         type: string
 *     - name: otherUsername
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
 *     description: Returns whether or not a user is following another user
 *     responses:
 *       204:
 *         description: Returns a boolean field "isFollowing"
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
  const { username, otherUsername } = req.query;

  if (!username) {
    res.status(400).json(errorMessage("Missing parameters: username"));
    return;
  }
  if (!otherUsername) {
    res.status(400).json(errorMessage("Missing parameters: otherUsername"));
    return;
  }
  if (username == otherUsername) {
    res
      .status(400)
      .json(errorMessage("username can't be the same as otherUsername"));
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
    for (let i = 0; i < user.following.length; i++) {
      if (user.following[i].username == otherUsername) {
        res.status(204).json(JSON.stringify({ isFollowing: true }, null, 2));
        return;
      }
    }

    res.status(204).json(JSON.stringify({ isFollowing: false }, null, 2));
    return;
  } else {
    res.status(404).json(errorMessage("User doesn't exists"));
    return;
  }
}
