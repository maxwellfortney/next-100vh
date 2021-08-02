import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../../utils/mongodb";
import { mongooseUserModel } from "../../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { email } = req.query;

  if (!email) {
    res.status(400).send("Bad request: missing parameters: email");
    return;
  }

  await dbConnect();

  const user = await mongooseUserModel.findOne({ email }).exec();

  if (user) {
    res.status(200).json(JSON.stringify(user));
  } else {
    res.status(404).end();
  }
}
