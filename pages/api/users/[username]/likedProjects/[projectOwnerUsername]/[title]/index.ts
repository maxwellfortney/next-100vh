import type { NextApiRequest, NextApiResponse } from "next";
import { mongooseUserModel } from "../../../../../../../models/User";
import dbConnect from "../../../../../../../utils/mongodb";
import { errorMessage } from "../../../../../../../utils/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { username, title, projectOwnerUsername } = req.query;

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
  if (!title) {
    res.status(400).json(errorMessage("Missing parameters: title"));
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
      (like) =>
        like.projectOwnerUsername == projectOwnerUsername &&
        like.projectTitle == title
    );

    if (likedProjects.length > 0) {
      res.status(200).json(JSON.stringify(likedProjects[0], null, 2));
      return;
    } else {
      res.status(404).json(errorMessage("User doesn't like this project"));
      return;
    }
  } else {
    res.status(404).json(errorMessage("User doesn't exists"));
  }
}
