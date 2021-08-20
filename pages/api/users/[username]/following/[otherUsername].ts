/**
 * @swagger
 * /api/users/{username}/following/{otherUsername}:
 *   parameters:
 *     - name: username
 *       in: path
 *       description: username of user
 *       required: true
 *       schema:
 *         type: string
 *     - name: otherUsername
 *       in: path
 *       description: username of user
 *       required: true
 *       schema:
 *         type: string
 *     - name: perPage
 *       in: query
 *       schema:
 *         type: integer
 *         minimum: 1
 *         maximum: 100
 *     - name: page
 *       in: query
 *       schema:
 *         type: integer
 *         minimum: 0
 *   get:
 *     description: Returns whether or not a user is following another user
 *     responses:
 *       204:
 *         description: Returns a boolean field "isFollowing"
 *       400:
 *         description: Invalid parameters
 *       404:
 *         description: User does not exist
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { mongooseUserModel } from "../../../../../models/User";
import { fetchDoesUserFollow } from "../../../../../utils/client/users";
import dbConnect from "../../../../../utils/mongodb";
import { errorMessage } from "../../../../../utils/server";
import { followUser, unfollowUser } from "../../../../../utils/server/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { username, otherUsername } = req.query;

    if (!username) {
        res.status(400).json(errorMessage("Missing parameters: username"));
        return;
    }
    if (!otherUsername) {
        res.status(400).json(errorMessage("Missing parameters: otherUsername"));
        return;
    }
    if (username == otherUsername) {
        res.status(400).json(
            errorMessage("username can't be the same as otherUsername")
        );
        return;
    }

    await dbConnect();

    const user = await mongooseUserModel.findOne(
        {
            username,
        },
        "following"
    );

    if (user) {
        let isFollowingRet = false;

        for (let i = 0; i < user.following.length; i++) {
            if (user.following[i].username == otherUsername) {
                isFollowingRet = true;
            }
        }

        if (req.method === "PUT") {
            const session = await getSession({ req });

            if (session) {
                if (
                    (session.user as any).username == (otherUsername as string)
                ) {
                    res.status(400).json(
                        errorMessage("Can't follow user with same username")
                    );
                    return;
                }

                if (session.user.username != username) {
                    res.status(400).json(
                        errorMessage(
                            "Can't follow for usernames other than your own"
                        )
                    );
                    return;
                }

                if (
                    await fetchDoesUserFollow(
                        (session.user as any).username,
                        otherUsername as string
                    )
                ) {
                    res.status(400).json(
                        errorMessage("Can't follow when user already follows")
                    );
                    return;
                }

                if (
                    await followUser(
                        (session.user as any).username,
                        otherUsername as string
                    )
                ) {
                    res.status(200).json(
                        JSON.stringify({ isFollowing: true }, null, 2)
                    );
                    return;
                } else {
                    res.status(400).json(errorMessage("Failed to follow user"));
                    return;
                }
            } else {
                res.status(401).json(
                    errorMessage("Unauthorized request: not signed in")
                );
                return;
            }
        } else if (req.method === "DELETE") {
            const session = await getSession({ req });

            if (session) {
                if (
                    (session.user as any).username == (otherUsername as string)
                ) {
                    res.status(400).json(
                        errorMessage("Can't unfollow user with same username")
                    );
                    return;
                }

                if (session.user.username != username) {
                    res.status(400).json(
                        errorMessage(
                            "Can't unfollow for usernames other than your own"
                        )
                    );
                    return;
                }

                if (
                    !(await fetchDoesUserFollow(
                        (session.user as any).username,
                        otherUsername as string
                    ))
                ) {
                    res.status(400).json(
                        errorMessage(
                            "Can't unfollow when user doesn't already follow"
                        )
                    );
                    return;
                }

                if (
                    await unfollowUser(
                        (session.user as any).username,
                        otherUsername as string
                    )
                ) {
                    res.status(200).json(
                        JSON.stringify({ isFollowing: false }, null, 2)
                    );
                    return;
                } else {
                    res.status(400).json(
                        errorMessage("Failed to unfollow user")
                    );
                    return;
                }
            }
        } else {
            res.status(200).json(
                JSON.stringify({ isFollowing: isFollowingRet }, null, 2)
            );
            return;
        }
    } else {
        res.status(404).json(errorMessage("User doesn't exists"));
        return;
    }
}
