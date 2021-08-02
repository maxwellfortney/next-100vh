import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import dbConnect from "../../../../utils/mongodb";
import { unfollowUser } from "../../../../utils/server/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { username } = req.query;

  const session = await getSession({ req });

  if (!session) {
    res.status(401).send("Unauthorized request: no session");
    return;
  }

  if (!username) {
    res.status(400).send("Bad request: missing parameters: username");
    return;
  }

  if ((session.user as any).username == (username as string)) {
    res.status(400).send("Bad request: can't follow user with same username");
    return;
  }

  await dbConnect();

  if (await unfollowUser((session.user as any).username, username as string)) {
    res
      .status(200)
      .send(`${(session.user as any).username} unfollowed ${username}`);
  } else {
    res.status(400).send("error");
  }
}
