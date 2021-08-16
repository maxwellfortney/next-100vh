import type { NextApiRequest, NextApiResponse } from "next";
import { mongooseProjectModel } from "../../../../../../models/Project";
import dbConnect from "../../../../../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { username, title } = req.query;

  if (!username) {
    res.status(400).send("Bad request: missing parameters: username");
    return;
  }

  if (!title) {
    res.status(400).send("Bad request: missing parameters: title");
    return;
  }

  await dbConnect();

  const project = await mongooseProjectModel.findOne({
    ownerUsername: username,
    title,
  });

  if (project) {
    res.status(200).json(JSON.stringify(project, null, 2));
    return;
  } else {
    res.status(404).send("Bad request: error getting user's project");
  }
}
