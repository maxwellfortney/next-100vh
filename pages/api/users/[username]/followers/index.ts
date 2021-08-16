import type { NextApiRequest, NextApiResponse } from "next";
import { mongooseProjectModel } from "../../../../../models/Project";
import { mongooseUserModel } from "../../../../../models/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { username, perPage = 35, page = 0 } = req.query;

    if (!username) {
        res.status(400).send("Bad request: missing parameters: username");
        return;
    }

    if (parseInt(perPage as any) > 100) {
        res.status(400).send("Bad request: perPage must be under 100");
        return;
    }

    const user = await mongooseUserModel.findOne(
        {
            username,
        },
        "followers"
    );

    const followers = user.followers.slice(
        parseInt(page as any) * parseInt(perPage as any),
        parseInt(page as any) * parseInt(perPage as any) +
            parseInt(perPage as any)
    );

    if (followers) {
        res.status(200).json(JSON.stringify(followers, null, 2));
        return;
    } else {
        res.status(400).send("Bad request: error getting user's followers");
    }
}
