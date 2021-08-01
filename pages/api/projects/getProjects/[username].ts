import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/mongodb";
import { mongooseProjectModel } from "../../../../models/Project";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { username } = req.query;

    console.log(username);

    await dbConnect();

    await mongooseProjectModel.find(
        { ownerUsername: username },
        (err, docs) => {
            console.log(err);
            console.log(docs);

            if (!err) {
                res.status(200).json(JSON.stringify(docs));
            } else if (err) {
                res.status(400).json(JSON.stringify(err));
            }
        }
    );

    // console.log("filteredDocs", filteredDocs);

    // if (filteredDocs) {
    //     res.status(200).json(JSON.stringify(filteredDocs));
    // }

    res.end();
}
