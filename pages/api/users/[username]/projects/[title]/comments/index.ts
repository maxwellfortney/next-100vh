import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { mongooseProjectCommentModel } from "../../../../../../../models/ProjectComment";
import dbConnect from "../../../../../../../utils/mongodb";
import { errorMessage } from "../../../../../../../utils/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { username, title, perPage = 100, page = 0, sort } = req.query;

  if (!username) {
    res.status(400).json(errorMessage("Missing parameters: username"));
    return;
  }

  if (!title) {
    res.status(400).json(errorMessage("Missing parameters: title"));
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

  if (req.method === "POST") {
    const session = await getSession({ req });
    if (session) {
      const { comment } = req.body;
      console.log(comment);

      if (!comment) {
        res.status(400).json(errorMessage("Missing comment in body"));
        return;
      }

      const projectComment = new mongooseProjectCommentModel({
        comment,
        commentOwnerId: session.user._id,
        commentOwnerUsername: session.user.username,
        commentOwnerImage: session.user.image,
        projectOwnerUsername: username,
        projectTitle: title,
      });

      const saved = await projectComment.save();

      if (saved) {
        res.status(204).send(`Added comment to project`);
        return;
      } else {
        res.status(400).send(`Bad request: failed to add comment to project`);
        return;
      }
    } else {
      res.status(401).json(errorMessage("Unauthorized request: not signed in"));
    }
  } else {
    const comments = await mongooseProjectCommentModel.find(
      {
        projectOwnerUsername: username,
        projectTitle: title,
      },
      undefined,
      {
        limit: parseInt(perPage as any),
        skip: parseInt(page as any) * parseInt(perPage as any),
        sort: {
          likes: -1,
          createdAt: -1,
        },
      }
    );

    if (comments) {
      res.status(200).json(JSON.stringify(comments, null, 2));
      return;
    } else {
      res.status(404).json(errorMessage("Error getting projects comments"));
    }
  }
}
