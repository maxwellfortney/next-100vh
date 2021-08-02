import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import dbConnect from "../../../../utils/mongodb";
import { mongooseUserModel } from "../../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { newUsername } = req.query;

  const session = await getSession({ req });

  if (session) {
    console.log(session);

    // const { db } =
    // const collection = db.collection("users");

    // const updateResult = await collection.updateOne(
    //     { email: session.user?.email },
    //     { $set: { username: newUsername } }
    // );
    // console.log(updateResult);

    await dbConnect();

    await mongooseUserModel.findOneAndUpdate(
      { email: session.user?.email },
      { username: newUsername },
      {},
      (err, doc, res2) => {
        if (err) {
          res.status(400);
        } else {
          res.redirect(200, "/");
        }
      }
    );

    // res.redirect(200, "/");
  } else {
    res.status(401);
  }

  // res.end();
}
