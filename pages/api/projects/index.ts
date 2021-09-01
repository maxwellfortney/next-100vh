/**
 * @swagger
 * /api/projects:
 *   parameters:
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
 *     description: Returns all 100 vh projects
 *     responses:
 *       200:
 *         description: Returns an array of 100vh projects
 *       400:
 *         description: Invalid parameters
 *       404:
 *         description: Failed to fetch 100vh projects
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { mongooseProjectModel } from "../../../models/Project";
import { errorMessage } from "../../../utils/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { perPage = 35, page = 0, sort } = req.query;

  console.log(req.query);

  if (parseInt(perPage as any) > 100 || parseInt(perPage as any) < 1) {
    res
      .status(400)
      .send("Bad request: perPage can't be greater than 35 or less than 1");
    return;
  }

  if (parseInt(page as any) < 0) {
    res.status(400).send("Bad request: page can't be below 0");
  }

  const projects = await mongooseProjectModel.find({}, "", {
    limit: parseInt(perPage as any),
    skip: parseInt(page as any) * parseInt(perPage as any),
    sort: {
      likes: -1,
      views: -1,
    },
  });

  if (projects) {
    res.status(200).json(JSON.stringify(projects, null, 2));
    return;
  } else {
    res.status(404).json(errorMessage("Projects doesn't exists"));
  }
}
