import type { NextApiRequest, NextApiResponse } from "next";
const { Octokit } = require("@octokit/rest");

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { accessToken } = req.query;

    if (!accessToken) {
        res.status(400).send("Bad request: missing parameters: accessToken");
        return;
    }

    const octokit = new Octokit({
        auth: accessToken,
    });

    const resJson = await octokit.request("GET /user");

    if (resJson.status === 200) {
        res.status(200).json(JSON.stringify(resJson.data));
        return;
    } else {
        res.status(400).send("Failed to fetch user orgs");
        return;
    }
}
