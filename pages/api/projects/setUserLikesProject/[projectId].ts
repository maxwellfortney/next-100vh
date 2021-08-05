import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession, session } from "next-auth/client";
import dbConnect from "../../../../utils/mongodb";
import { mongooseProjectModel } from "../../../../models/Project";
import { mongooseUserModel } from "../../../../models/User";
import {
  AddLikeToProject,
  addLikeToUser,
  removeLikeFromProject,
  removeLikeFromUser,
} from "../../../../utils/server/projects";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session = await getSession({ req });
  const { projectId, shouldLike } = req.query;
  console.log("query ", req.query);

  async function alreadyLiked() {
    const res = await fetch(
      "http://localhost:3000/api/projects/getDoesUserLikeProject/" +
        (session?.user as any).username +
        "?projectId=" +
        projectId
    );

    return await res.json();
  }

  if (!session) {
    res.status(401).send("Unauthorized request: no session");
    return;
  }

  if (!projectId && !shouldLike) {
    res
      .status(400)
      .send("Bad request: missing parameters: projectId shouldLike");
    return;
  } else if (!projectId && shouldLike) {
    res.status(400).send("Bad request: missing parameters: projectId");
    return;
  } else if (projectId && !shouldLike) {
    res.status(400).send("Bad request: missing parameters: shouldLike");
    return;
  }

  const userAlreadyLiked = await alreadyLiked();
  await dbConnect();

  if (userAlreadyLiked && shouldLike == "false") {
    await removeLikeFromUser(
      (session?.user as any).username,
      projectId as string
    );
    await removeLikeFromProject(projectId as string);
    res
      .status(200)
      .send(
        `Removed like by user ${
          (session?.user as any).username
        } from project ${projectId}`
      );
    return;
  } else if (userAlreadyLiked && shouldLike == "true") {
    res
      .status(400)
      .send(
        `Bad request: user already likes project ${projectId} and shouldLike was set to true`
      );
    return;
  }

  if (!userAlreadyLiked && shouldLike == "true") {
    await addLikeToUser((session?.user as any).username, projectId as string);
    await AddLikeToProject(projectId as string);
    res
      .status(200)
      .send(
        `Added like by user ${
          (session?.user as any).username
        } to project ${projectId}`
      );
    return;
  } else if (!userAlreadyLiked && shouldLike == "false") {
    res
      .status(400)
      .send(
        `Bad request: user does not already like project ${projectId} and shouldLike was set to false`
      );

    return;
  }

  res.end();
}