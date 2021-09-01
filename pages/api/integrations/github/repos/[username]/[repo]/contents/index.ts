import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { errorMessage } from "../../../../../../../../utils/server";
const { Octokit } = require("@octokit/rest");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { username, repo } = req.query;

  if (!username) {
    res.status(400).json(errorMessage("Missing parameters: username"));
    return;
  }

  if (!repo) {
    res.status(400).json(errorMessage("Missing parameters: repo"));
    return;
  }

  const session = await getSession({ req });

  if (session) {
    const githubRes = await fetch(
      `https://api.github.com/repos/${username}/${repo}/contents`,
      {
        headers: {
          Authorization: `token ${session.accessToken}`,
        },
      }
    );

    if (githubRes.status === 200) {
      res.status(200).json(JSON.stringify(await githubRes.json(), null, 2));
      return;
    } else {
      res.status(404).json(errorMessage("Failed to fetch page"));
      return;
    }
  } else {
    res.status(401).json(errorMessage("Unauthorized request: not signed in"));
    return;
  }
}
