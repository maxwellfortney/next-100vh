import type { NextApiRequest, NextApiResponse } from "next";
import { mongooseUserModel } from "../../../models/User";
import { getUserByUsername } from "../../../utils/server/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { perPage = 35, page = 0 } = req.query;

    console.log(req.query);

    if (parseInt(perPage as any) > 100) {
        res.status(400).send("Bad request: perPage must be under 100");
        return;
    }

    const user = await mongooseUserModel.find({}, "", {
        limit: parseInt(perPage as any),
        skip: parseInt(page as any) * parseInt(perPage as any),
    });

    if (user) {
        res.status(200).json(JSON.stringify(user, null, 2));
        return;
    } else {
        res.status(400).send("Bad request: error getting user");
    }
}
