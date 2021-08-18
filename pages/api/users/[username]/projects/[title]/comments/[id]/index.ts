import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { mongooseProjectCommentModel } from "../../../../../../../../models/ProjectComment";
import dbConnect from "../../../../../../../../utils/mongodb";
import { errorMessage } from "../../../../../../../../utils/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { username, title, id, perPage = 100, page = 0, sort } = req.query;

  if (!username) {
    res.status(400).json(errorMessage("Missing parameters: username"));
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

  let comment: any = null;
  try {
    comment = await mongooseProjectCommentModel.findById(
      new ObjectId(id as string)
    );
  } catch (e) {
    res.status(404).json(errorMessage("No comment with id found"));
    return;
  }

  console.log("comment ", comment);

  if (!comment) {
    res.status(404).json(errorMessage("No comment with id found"));
    return;
  }

  if (req.method === "DELETE") {
    const session = await getSession({ req });

    if (session) {
      if (session.user.username != comment.commentOwnerUsername) {
        res
          .status(400)
          .json(errorMessage("Can't remove someone else's comment"));
        return;
      } else {
        const removed = await mongooseProjectCommentModel.findByIdAndDelete(
          new ObjectId(id as string)
        );

        if (removed) {
          res.status(204).send("removed comment from project");
        } else {
          res
            .status(400)
            .json(errorMessage("Failed to remove comment from project"));
        }
      }
    } else {
      res.status(401).json(errorMessage("Unauthorized request: not signed in"));
    }
  } else {
    res.status(200).json(JSON.stringify(comment, null, 2));
  }
}
