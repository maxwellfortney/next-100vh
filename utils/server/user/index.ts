import { mongooseUserModel } from "../../../models/User";
import { mongooseProjectModel } from "../../../models/Project";
import { ObjectId } from "mongodb";

export async function addUserToFollowing(
    myUsername: string,
    toUsername: string
) {
    try {
        await mongooseUserModel.findOneAndUpdate(
            {
                username: myUsername,
            },
            {
                $push: {
                    following: {
                        username: toUsername,
                        followedAt: new Date(),
                    },
                },
            }
        );
        return true;
    } catch (e) {
        return false;
    }
}

export async function removeUserFromFollowing(
    myUsername: string,
    toUsername: string
) {
    try {
        await mongooseUserModel.findOneAndUpdate(
            {
                username: myUsername,
            },
            {
                $pull: {
                    following: {
                        username: toUsername,
                    },
                },
            }
        );
        return true;
    } catch (e) {
        return false;
    }
}

export async function addUserToFollowers(
    myUsername: string,
    toUsername: string
) {
    try {
        await mongooseUserModel.findOneAndUpdate(
            {
                username: myUsername,
            },
            {
                $push: {
                    followers: {
                        username: toUsername,
                        followedAt: new Date(),
                    },
                },
            }
        );
        return true;
    } catch (e) {
        return false;
    }
}

export async function removeUserFromFollowers(
    myUsername: string,
    toUsername: string
) {
    try {
        await mongooseUserModel.findOneAndUpdate(
            {
                username: myUsername,
            },
            {
                $pull: {
                    followers: {
                        username: toUsername,
                    },
                },
            }
        );
        return true;
    } catch (e) {
        return false;
    }
}

export async function followUser(myUsername: string, toUsername: string) {
    return (
        (await addUserToFollowing(myUsername, toUsername)) &&
        (await addUserToFollowers(toUsername, myUsername))
    );
}

export async function unfollowUser(myUsername: string, toUsername: string) {
    return (
        (await removeUserFromFollowing(myUsername, toUsername)) &&
        (await removeUserFromFollowers(toUsername, myUsername))
    );
}

export async function getUserByUsername(username: string) {
    const user = await mongooseUserModel.findOne({ username }).exec();
    return user.toObject();
}
