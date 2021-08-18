/**
 * @swagger
 * /api/users/{username}:
 *   parameters:
 *     - name: username
 *       in: path
 *       description: username of user
 *       required: true
 *       schema:
 *         type: string
 *   get:
 *     description: Returns a single 100vh user by username
 *     responses:
 *       200:
 *         description: Returns a single 100vh user object
 *       404:
 *         description: User does not exist
 */

import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../utils/mongodb";
import { errorMessage } from "../../../../utils/server";
import { getUserByUsername } from "../../../../utils/server/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { username, followers, following } = req.query;

  if (!username) {
    res.status(400).json(errorMessage("Missing parameters: username"));
    return;
  }

  await dbConnect();

  const user = await getUserByUsername(username as string, "");

  if (user) {
    res.status(200).json(JSON.stringify(user, null, 2));
    return;
  } else {
    res.status(404).json(errorMessage("User doesn't exists"));
    return;
  }
}
