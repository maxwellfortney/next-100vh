import type { NextApiRequest, NextApiResponse } from "next";
import { mongooseProjectModel } from "../../../../../models/Project";
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
    res
      .status(400)
      .json(errorMessage("perPage can't be greater than 100 or less than 1"));
    return;
  }

  if (parseInt(page as any) < 0) {
    res.status(400).json(errorMessage("page can't be below 0"));
    return;
  }

  await dbConnect();

  const projects = await mongooseProjectModel.find(
    {
      ownerUsername: username,
    },
    undefined,
    {
      limit: parseInt(perPage as any),
      skip: parseInt(page as any) * parseInt(perPage as any),
    }
  );

  if (projects) {
    res.status(200).json(JSON.stringify(projects, null, 2));
    return;
  } else {
    res.status(400).json(errorMessage("Error getting user's projects"));
  }
}
