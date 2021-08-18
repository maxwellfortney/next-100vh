import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import dbConnect from "../../../../utils/mongodb";
import { errorMessage } from "../../../../utils/server";
import { followUser } from "../../../../utils/server/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { username } = req.query;

  const session = await getSession({ req });

  if (!session) {
    res.status(401).json(errorMessage("Unauthorized request: no session"));
    return;
  }

  if (!username) {
    res.status(400).json(errorMessage("Missing parameters: username"));
    return;
  }

  if ((session.user as any).username == (username as string)) {
    res.status(400).json(errorMessage("User can't follow themself"));
    return;
  }

  await dbConnect();

  if (await followUser((session.user as any).username, username as string)) {
    res
      .status(200)
      .send(`${(session.user as any).username} now follows ${username}`);
  } else {
    res.status(400).json(errorMessage("Failed to follow user"));
  }
}
