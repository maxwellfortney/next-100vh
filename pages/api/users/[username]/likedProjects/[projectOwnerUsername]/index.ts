import type { NextApiRequest, NextApiResponse } from "next";
import { mongooseUserModel } from "../../../../../../models/User";
import dbConnect from "../../../../../../utils/mongodb";
import { errorMessage } from "../../../../../../utils/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { username, projectOwnerUsername, perPage = 35, page = 0 } = req.query;

  if (!username) {
    res.status(400).json(errorMessage("Missing parameters: username"));
    return;
  }
  if (!projectOwnerUsername) {
    res
      .status(400)
      .json(errorMessage("Missing parameters: projectOwnerUsername"));
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

  const user = await mongooseUserModel.findOne(
    {
      username,
    },
    "likedProjects"
  );

  if (user) {
    let likedProjects = [];
    likedProjects = user.likedProjects.filter(
      (like) => like.projectOwnerUsername == projectOwnerUsername
    );

    likedProjects = likedProjects.slice(
      parseInt(page as any) * parseInt(perPage as any),
      parseInt(page as any) * parseInt(perPage as any) +
        parseInt(perPage as any)
    );

    if (likedProjects.length > 0) {
      res.status(200).json(JSON.stringify(likedProjects, null, 2));
      return;
    } else {
      res.status(404).json("User doesnt like any projects from otherUser");
    }
  } else {
    res.status(404).json(errorMessage("User doesn't exists"));
    return;
  }
}
