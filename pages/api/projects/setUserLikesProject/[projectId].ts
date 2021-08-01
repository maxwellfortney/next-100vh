import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession, session } from "next-auth/client";
import dbConnect from "../../../../lib/mongodb";
import { mongooseProjectModel } from "../../../../models/Project";
import { mongooseUserModel } from "../../../../models/User";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const session = await getSession({ req });
    const { projectId, shouldLike } = req.query;
    console.log(projectId);

    async function alreadyLiked() {
        const res = await fetch(
            "http://localhost:3000/api/projects/getDoesUserLikeProject/" +
                (session?.user as any).username +
                "?projectId=" +
                projectId
        );

        return await res.json();
    }

    if (session && projectId && shouldLike) {
        const userAlreadyLiked = await alreadyLiked();

        await dbConnect();

        if (userAlreadyLiked && shouldLike == "false") {
            await mongooseProjectModel.findByIdAndUpdate(projectId, {
                $inc: { likes: -1 },
            });

            console.log(
                await mongooseUserModel.findOneAndUpdate(
                    {
                        username: (session.user as any).username,
                    },
                    {
                        $pull: {
                            projectLikes: {
                                projectId: new ObjectId(projectId as string),
                            },
                        },
                    }
                )
            );

            // console.log("user ", user);
            // console.log(
            //     await user.projectLikes.pull({
            //         "projectLikes.$.projectId": projectId as string,
            //     })
            // );
            // console.log(await user.save());
            // console.log(user.projectLikes.pull({ projectId }));
            // console.log(user.projectLikes.pull({ projectId: projectId }));
        } else if (userAlreadyLiked && shouldLike == "true") {
            return;
        }

        if (!userAlreadyLiked && shouldLike == "true") {
            await mongooseProjectModel.findByIdAndUpdate(projectId, {
                $inc: { likes: 1 },
            });
        } else if (!userAlreadyLiked && shouldLike == "false") {
            return;
        }
    } else {
        res.status(401);
    }

    res.end();
}
