import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/mongodb";
import { mongooseUserModel } from "../../../../models/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { username, projectId } = req.query;

    await dbConnect();
    const filteredDocs = await mongooseUserModel.findOne({ username }).exec();

    if (filteredDocs) {
        let userDidLike = false;

        filteredDocs.projectLikes.forEach((like) => {
            if (like.projectId == projectId) {
                userDidLike = true;
                console.log(userDidLike);

                res.status(200).end(JSON.stringify(userDidLike));
            }
        });
        if (!userDidLike) {
            console.log(userDidLike);
            res.status(200);
            res.end(JSON.stringify(userDidLike));
        }
    }

    // res.end();
}
