import type { NextApiRequest, NextApiResponse } from "next";
const { Octokit } = require("@octokit/rest");

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { accessToken, org } = req.query;

    if (!accessToken && !org) {
        res.status(400).send(
            "Bad request: missing parameters: accessToken org"
        );
        return;
    } else if (!accessToken && org) {
        res.status(400).send("Bad request: missing parameters: accessToken");
        return;
    } else if (accessToken && !org) {
        res.status(400).send("Bad request: missing parameters: org");
        return;
    }

    const octokit = new Octokit({
        auth: accessToken,
    });

    const resJson = await octokit.request("GET /orgs/{org}/repos", {
        org,
        sort: "updated",
        per_page: 100,
    });

    if (resJson.status === 200) {
        res.status(200).json(JSON.stringify(resJson.data));
        return;
    } else {
        res.status(400).send("Failed to fetch user orgs");
        return;
    }
}
