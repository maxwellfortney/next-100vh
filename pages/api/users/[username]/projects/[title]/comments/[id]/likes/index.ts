import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { mongooseProjectCommentModel } from "../../../../../../../../../models/ProjectComment";
import { doesUserLikeComment } from "../../../../../../../../../utils/client/projects";
import dbConnect from "../../../../../../../../../utils/mongodb";
import { errorMessage } from "../../../../../../../../../utils/server";
import {
  addCommentLikeToUser,
  addLikeToComment,
  removeCommentLikeFromUser,
  removeLikeFromComment,
  removeLikeFromUser,
} from "../../../../../../../../../utils/server/projects";

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
  if (req.method === "POST") {
    const session = await getSession({ req });

    if (session) {
      const doesLike = await doesUserLikeComment(
        session.user.username as string,
        username as string,
        title as string,
        comment._id
      );

      console.log("doesLike ", doesLike);

      if (doesLike) {
        res.status(400).json(errorMessage("User already likes this comment"));
        return;
      }

      if (await addLikeToComment(comment._id)) {
        if (
          await addCommentLikeToUser(
            session.user.username as string,
            username as string,
            title as string,
            comment._id
          )
        ) {
          res.status(204).send("added like to comment");
          return;
        } else {
          res
            .status(400)
            .json(errorMessage("Error adding like to user likedComments"));
          return;
        }
      } else {
        res.status(400).json(errorMessage("Error incrementing comment likes"));
        return;
      }
    } else {
      res.status(401).json(errorMessage("Unauthorized request: not signed in"));
      return;
    }
  } else if (req.method === "DELETE") {
    const session = await getSession({ req });

    if (session) {
      const doesLike = await doesUserLikeComment(
        session.user.username as string,
        username as string,
        title as string,
        comment._id
      );

      console.log("doesLike ", doesLike);

      if (!doesLike) {
        res
          .status(400)
          .json(
            errorMessage("Can't remove like when user doesn't already like")
          );
        return;
      }

      if (await removeLikeFromComment(comment._id)) {
        if (
          await removeCommentLikeFromUser(
            session.user.username as string,
            username as string,
            title as string,
            comment._id
          )
        ) {
          res.status(204).send("Removed like from comment");
          return;
        } else {
          res
            .status(400)
            .json(errorMessage("Error removing like from user likedComments"));
          return;
        }
      } else {
        res.status(400).json(errorMessage("Error decrementing comment likes"));
        return;
      }
    } else {
      res.status(401).json(errorMessage("Unauthorized request: not signed in"));
      return;
    }
  } else {
    res.status(200).json(JSON.stringify({ likes: comment.likes }, null, 2));
    return;
  }
}
