import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { errorMessage } from "../../../../../../../utils/server";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { id } = req.query;
    const session = await getSession({ req });

    console.log(session);
    if (session) {
        const gitlabRes = await fetch(
            `https://gitlab.com/api/v4/groups/${id}/projects?access_token=${session.accessToken}&membership=true`
        );

        console.log("status", gitlabRes.status);

        if (gitlabRes.status === 200) {
            const groupsRes = await gitlabRes.json();
            console.log(groupsRes);
            res.status(200).json(JSON.stringify(groupsRes, null, 2));
            return;
        } else {
            res.status(404).json(
                errorMessage("Failed to fetch groups from gitlab")
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
