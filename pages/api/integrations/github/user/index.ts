import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { errorMessage } from "../../../../../utils/server";
const { Octokit } = require("@octokit/rest");

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const session = await getSession({ req });

    if (session) {
        const octokit = new Octokit({
            auth: session.accessToken,
        });

        const resJson = await octokit.request("GET /user");

        if (resJson.status === 200) {
            res.status(200).json(JSON.stringify(resJson.data));
            return;
        } else {
            res.status(400).send(errorMessage("Failed to fetch user"));
            return;
        }
    } else {
        res.status(401).json(
            errorMessage("Unauthorized request: not signed in")
        );
        return;
    }
}
