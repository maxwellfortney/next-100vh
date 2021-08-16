import { mongooseUserModel } from "../../../models/User";
import { mongooseProjectModel } from "../../../models/Project";
import { ObjectId } from "mongodb";
import { mongooseProjectCommentModel } from "../../../models/ProjectComment";

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

export async function addCommentLikeToUser(
  username: string,
  projectOwnerUsername: string,
  projectTitle: string,
  commentId: string
) {
  try {
    return await mongooseUserModel.findOneAndUpdate(
      {
        username,
      },
      {
        $push: {
          likedComments: {
            commentId,
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

export async function removeCommentLikeFromUser(
  username: string,
  projectOwnerUsername: string,
  projectTitle: string,
  commentId: string
) {
  try {
    return await mongooseUserModel.findOneAndUpdate(
      {
        username,
      },
      {
        $pull: {
          likedComments: {
            commentId,
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

export async function removeLikeFromComment(commentId: any) {
  try {
    return await mongooseProjectCommentModel.findByIdAndUpdate(
      new ObjectId(commentId),
      {
        $inc: { likes: -1 },
      }
    );
  } catch (e) {
    return false;
  }
}

export async function addLikeToComment(commentId: any) {
  try {
    return await mongooseProjectCommentModel.findByIdAndUpdate(
      new ObjectId(commentId),
      {
        $inc: { likes: 1 },
      }
    );
  } catch (e) {
    return false;
  }
}

export async function removeLikeFromProject(project: any) {
  try {
    return await mongooseProjectModel.findOneAndUpdate(
      { ownerUsername: project.ownerUsername, title: project.title },
      {
        $inc: { likes: -1 },
      }
    );
  } catch (e) {
    return false;
  }
}

export async function addLikeToProject(project: any) {
  try {
    return await mongooseProjectModel.findOneAndUpdate(
      { ownerUsername: project.ownerUsername, title: project.title },
      {
        $inc: { likes: 1 },
      }
    );
  } catch (e) {
    return false;
  }
}

export async function addViewToProject(projectId: string) {
  try {
    return await mongooseProjectModel.findByIdAndUpdate(projectId, {
      $inc: { views: 1 },
    });
  } catch (e) {
    return false;
  }
}
