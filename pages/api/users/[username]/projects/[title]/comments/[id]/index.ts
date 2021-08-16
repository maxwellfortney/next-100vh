import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { mongooseProjectCommentModel } from "../../../../../../../../models/ProjectComment";
import dbConnect from "../../../../../../../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { username, title, id, perPage = 100, page = 0, sort } = req.query;

  if (!username) {
    res.status(400).send("Bad request: missing parameters: username");
    return;
  }

  if (!title) {
    res.status(400).send("Bad request: missing parameters: title");
    return;
  }

  if (!id) {
    res.status(400).send("Bad request: missing parameters: id");
    return;
  }

  if (parseInt(perPage as any) > 100 || parseInt(perPage as any) < 1) {
    res
      .status(400)
      .send("Bad request: perPage can't be greater than 100 or less than 1");
    return;
  }

  await dbConnect();

  let comment: any = null;
  try {
    comment = await mongooseProjectCommentModel.findById(
      new ObjectId(id as string)
    );
  } catch (e) {
    res.status(404).send("Bad request: no comment with id found");
    return;
  }

  console.log("comment ", comment);

  if (!comment) {
    res.status(404).send("Bad request: no comment with id found");
    return;
  }

  if (req.method === "DELETE") {
    const session = await getSession({ req });

    if (session) {
      if (session.user.username != comment.commentOwnerUsername) {
        res
          .status(400)
          .send(`Bad request: cannot remove someone else's comment`);
        return;
      } else {
        const removed = await mongooseProjectCommentModel.findByIdAndDelete(
          new ObjectId(id as string)
        );

        if (removed) {
          res.status(204).send("removed comment from project");
        } else {
          res.status(400).send("failed to remove comment from project");
        }
      }
    } else {
      res.status(401).send("error adding comment: not signed in");
    }
  } else {
    res.status(200).json(JSON.stringify(comment, null, 2));
  }
}
