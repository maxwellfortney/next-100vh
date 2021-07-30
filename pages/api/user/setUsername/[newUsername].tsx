import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../../lib/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { newUsername } = req.query;

    const session = await getSession({ req });

    if (session) {
        console.log(session);

        const { db } = await connectToDatabase();
        const collection = db.collection("users");

        const updateResult = await collection.updateOne(
            { email: session.user?.email },
            { $set: { username: newUsername } }
        );
        console.log(updateResult);

        res.redirect(200, "/");
    } else {
        res.status(401);
    }

    res.end();
}
