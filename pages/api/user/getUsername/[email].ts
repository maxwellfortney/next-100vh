import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../../lib/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { email } = req.query;

    const session = await getSession({ req });

    console.log("session ", session);

    const { db } = await connectToDatabase();
    const collection = db.collection("users");

    const filteredDocs = await collection.find({ email }).toArray();
    console.log("HEREH", filteredDocs);

    if (filteredDocs.length > 0) {
        res.status(200).json({ username: filteredDocs[0].username });
    } else {
        res.status(404);
    }

    // if (session) {
    //     const { db } = await connectToDatabase();
    //     const collection = db.collection("users");

    //     const filteredDocs = await collection.find({ email }).toArray();
    //     console.log("HEREH", filteredDocs);

    // } else {
    //     res.status(401);
    // }

    res.end();
}
