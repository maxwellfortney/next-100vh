import type { NextApiRequest, NextApiResponse } from "next";
import { mongooseUserModel } from "../../../../../../../models/User";
import dbConnect from "../../../../../../../utils/mongodb";
import { errorMessage } from "../../../../../../../utils/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const {
    username,
    title,
    projectOwnerUsername,
    perPage = 35,
    page = 0,
  } = req.query;

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
    res.status(400).send("Bad request: missing parameters: title");
    return;
  }

  if (parseInt(perPage as any) > 100) {
    res.status(400).send("Bad request: perPage must be under 100");
    return;
  }

  await dbConnect();

  const user = await mongooseUserModel.findOne(
    {
      username,
    },
    "likedComments"
  );

  if (user) {
    let likedComments = [];
    likedComments = user.likedComments.filter(
      (like) =>
        like.projectOwnerUsername == projectOwnerUsername &&
        like.projectTitle == title
    );

    likedComments = likedComments.slice(
      parseInt(page as any) * parseInt(perPage as any),
      parseInt(page as any) * parseInt(perPage as any) +
        parseInt(perPage as any)
    );

    if (likedComments.length > 0) {
      res.status(200).json(JSON.stringify(likedComments, null, 2));
      return;
    } else {
      res
        .status(404)
        .json(errorMessage("User doesn't like project from otherUser"));
      return;
    }
  } else {
    res.status(404).json(errorMessage("User doesn't exists"));
    return;
  }
}
