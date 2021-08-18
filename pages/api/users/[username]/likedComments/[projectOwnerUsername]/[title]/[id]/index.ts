import type { NextApiRequest, NextApiResponse } from "next";
import { mongooseUserModel } from "../../../../../../../../models/User";
import dbConnect from "../../../../../../../../utils/mongodb";
import { errorMessage } from "../../../../../../../../utils/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { username, title, projectOwnerUsername, id } = req.query;

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

  if (!id) {
    res.status(400).json(errorMessage("Missing parameters: id"));
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
        like.projectTitle == title &&
        like.commentId == id
    );

    if (likedComments.length > 0) {
      res.status(200).json(JSON.stringify(likedComments[0], null, 2));
      return;
    } else {
      res.status(404).send("user doesnt like this comment");
    }
  } else {
    res.status(404).json(errorMessage("User doesn't exists"));
    return;
  }
}
