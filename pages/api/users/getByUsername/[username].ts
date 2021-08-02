import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../../utils/mongodb";
import { mongooseUserModel } from "../../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { username } = req.query;

  if (!username) {
    res.status(400).send("Bad request: missing parameters: username");
    return;
  }

  await dbConnect();

  const user = await mongooseUserModel.findOne({ username }).exec();

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).end();
  }
}
