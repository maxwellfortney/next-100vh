import type { NextApiRequest, NextApiResponse } from "next";
import { getUserByUsername } from "../../../../utils/server/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { username, followers, following } = req.query;

    if (!username) {
        res.status(400).send("Bad request: missing parameters: username");
        return;
    }

    const user = await getUserByUsername(username as string, "");

    if (user) {
        res.status(200).json(JSON.stringify(user, null, 2));
        return;
    } else {
        res.status(400).send("Bad request: error getting user");
    }
}
