import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { mongooseProjectModel } from "../../../../../../../models/Project";
import { doesUserLikeProject } from "../../../../../../../utils/client/projects";
import {
    addLikeToUser,
    removeLikeFromUser,
} from "../../../../../../../utils/server/projects";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { username, title, perPage = 100, page = 0 } = req.query;

    if (!username) {
        res.status(400).send("Bad request: missing parameters: username");
        return;
    }

    if (!title) {
        res.status(400).send("Bad request: missing parameters: title");
        return;
    }

    if (parseInt(perPage as any) > 100 || parseInt(perPage as any) < 1) {
        res.status(400).send(
            "Bad request: perPage can't be greater than 100 or less than 1"
        );
        return;
    }

    if (req.method === "POST") {
        const session = await getSession({ req });

        if (session) {
            const doesLike = await doesUserLikeProject(
                session.user.username as string,
                username as string,
                title as string
            );

            console.log("doesLike ", doesLike);

            if (doesLike) {
                res.status(400).send("user already likes this project");
                return;
            }

            const project = await mongooseProjectModel.findOneAndUpdate(
                {
                    ownerUsername: username,
                    title: title,
                },
                {
                    $inc: { likes: 1 },
                }
            );

            if (project) {
                const updated = await addLikeToUser(
                    session.user.username as any,
                    project.ownerUsername,
                    project.title
                );
                if (updated) {
                    res.status(204).send("Added like to project");
                    return;
                } else {
                    res.status(400).send(
                        "Bad request: error adding like to user"
                    );
                    return;
                }
            } else {
                res.status(400).send(
                    "Bad request: error adding like to project"
                );
            }
        } else {
            res.status(401).send("Bad request: must be signed in");
        }
    } else if (req.method === "DELETE") {
        const session = await getSession({ req });

        if (session) {
            const doesLike = await doesUserLikeProject(
                session.user.username as string,
                username as string,
                title as string
            );

            console.log("doesLike ", doesLike);

            if (!doesLike) {
                res.status(400).send("user doesn't already like this project");
                return;
            }

            const project = await mongooseProjectModel.findOneAndUpdate(
                {
                    ownerUsername: username,
                    title: title,
                },
                {
                    $inc: { likes: -1 },
                }
            );

            if (project) {
                const updated = await removeLikeFromUser(
                    session.user.username as any,
                    project.ownerUsername,
                    project.title
                );
                if (updated) {
                    res.status(204).send("Removed like from project");
                    return;
                } else {
                    res.status(400).send(
                        "Bad request: error removing like from user"
                    );
                    return;
                }
            } else {
                res.status(400).send(
                    "Bad request: error removing like from project"
                );
            }
        } else {
            res.status(401).send("Bad request: must be signed in");
        }
    } else {
        const project = await mongooseProjectModel.findOne(
            {
                ownerUsername: username,
                title: title,
            },
            "likes"
        );

        if (project) {
            res.status(200).json(
                JSON.stringify({ likes: project.likes }, null, 2)
            );
            return;
        } else {
            res.status(404).send("Bad request: error getting project");
        }
    }
}
