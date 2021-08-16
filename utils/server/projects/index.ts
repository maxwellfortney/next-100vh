import { mongooseUserModel } from "../../../models/User";
import { mongooseProjectModel } from "../../../models/Project";
import { ObjectId } from "mongodb";

export async function addLikeToUser(
    username: string,
    projectOwnerUsername: string,
    projectTitle: string
) {
    try {
        return await mongooseUserModel.findOneAndUpdate(
            {
                username,
            },
            {
                $push: {
                    likedProjects: {
                        projectTitle,
                        projectOwnerUsername,
                        createdAt: new Date(),
                    },
                },
            }
        );
    } catch (e) {
        return false;
    }
}

export async function removeLikeFromUser(
    username: string,
    projectOwnerUsername: string,
    projectTitle: string
) {
    try {
        return await mongooseUserModel.findOneAndUpdate(
            {
                username,
            },
            {
                $pull: {
                    likedProjects: {
                        projectTitle,
                        projectOwnerUsername,
                    },
                },
            }
        );
    } catch (e) {
        return false;
    }
}

export async function removeLikeFromProject(project: any) {
    try {
        await mongooseProjectModel.findOneAndUpdate(
            { ownerUsername: project.ownerUsername, title: project.title },
            {
                $inc: { likes: -1 },
            }
        );
        return true;
    } catch (e) {
        return false;
    }
}

export async function addLikeToProject(project: any) {
    try {
        await mongooseProjectModel.findOneAndUpdate(
            { ownerUsername: project.ownerUsername, title: project.title },
            {
                $inc: { likes: 1 },
            }
        );
        return true;
    } catch (e) {
        return false;
    }
}

export async function addViewToProject(projectId: string) {
    try {
        await mongooseProjectModel.findByIdAndUpdate(projectId, {
            $inc: { views: 1 },
        });
        return true;
    } catch (e) {
        return false;
    }
}
