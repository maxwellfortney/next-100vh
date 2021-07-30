import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { username } = req.query;

    const { db } = await connectToDatabase();
    const collection = db.collection("users");

    const filteredDocs = await collection.find({ username }).toArray();

    console.log(filteredDocs);
    res.status(200).json({ isAvailable: filteredDocs.length === 0 });
}
