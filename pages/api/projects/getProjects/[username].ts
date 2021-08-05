import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../utils/mongodb";
import { mongooseProjectModel } from "../../../../models/Project";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { username } = req.query;

  if (!username) {
    res.status(400).send("Bad request: missing parameters: username");
    return;
  }

  const projects = await mongooseProjectModel
    .find({ ownerUsername: username })
    .exec();

  if (projects) {
    res.status(200).json(JSON.stringify(projects));
    return;
  } else {
    res.status(400).send("Bad request: unknown error fetching from database");
  }
}