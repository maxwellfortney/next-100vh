import { mongooseUserModel } from "../../../models/User";
import { mongooseProjectModel } from "../../../models/Project";
import { ObjectId } from "mongodb";

export async function addLikeToUser(username: string, projectId: string) {
  try {
    await mongooseUserModel.findOneAndUpdate(
      {
        username,
      },
      {
        $push: {
          projectLikes: {
            projectId: new ObjectId(projectId as string),
            createdAt: new Date(),
          },
        },
      }
    );
    return true;
  } catch (e) {
    return false;
  }
}

export async function removeLikeFromUser(username: string, projectId: string) {
  try {
    await mongooseUserModel.findOneAndUpdate(
      {
        username,
      },
      {
        $pull: {
          projectLikes: {
            projectId: new ObjectId(projectId as string),
          },
        },
      }
    );
    return true;
  } catch (e) {
    return false;
  }
}

export async function removeLikeFromProject(projectId: string) {
  try {
    await mongooseProjectModel.findByIdAndUpdate(projectId, {
      $inc: { likes: -1 },
    });
    return true;
  } catch (e) {
    return false;
  }
}

export async function AddLikeToProject(projectId: string) {
  try {
    await mongooseProjectModel.findByIdAndUpdate(projectId, {
      $inc: { likes: 1 },
    });
    return true;
  } catch (e) {
    return false;
  }
}
