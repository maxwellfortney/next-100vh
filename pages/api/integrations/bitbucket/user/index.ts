import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { errorMessage } from "../../../../../utils/server";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const session = await getSession({ req });

    console.log(session);
    if (session) {
        const bitbucketRes = await fetch(
            `https://api.bitbucket.org/2.0/user?access_token=${session.accessToken}`
        );

        console.log("status", bitbucketRes.status);

        if (bitbucketRes.status === 200) {
            const userRes = await bitbucketRes.json();
            console.log(userRes);
            res.status(200).json(JSON.stringify(userRes, null, 2));
            return;
        } else {
            res.status(404).json(
                errorMessage("Failed to fetch user from bitbucket")
            );
            return;
        }
    } else {
        res.status(401).json(
            errorMessage("Unauthorized request: not signed in")
        );
        return;
    }
}
