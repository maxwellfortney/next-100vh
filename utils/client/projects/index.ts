export async function doesUserLikeProject(
  username: string,
  projectOwnerUsername: string,
  projectTitle: string
) {
  const res = await fetch(
    process.env.NODE_ENV === "production"
      ? (process.env.PROD_URL as string)
      : "http://localhost:3000" +
          `/api/users/${username}/likedProjects/${projectOwnerUsername}/${projectTitle}`
  );

  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
}

export async function doesUserLikeComment(
  username: string,
  projectOwnerUsername: string,
  projectTitle: string,
  commentId: string
) {
  const res = await fetch(
    process.env.NODE_ENV === "production"
      ? (process.env.PROD_URL as string)
      : "http://localhost:3000" +
          `/api/users/${username}/likedComments/${projectOwnerUsername}/${projectTitle}/${commentId}`
  );

  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
}

export async function addViewToProject(project: any) {
  const res = await fetch(
    `/api/users/${project.ownerUsername}/projects/${project.title}/views`,
    {
      method: "POST",
    }
  );

  if (res.status === 204) {
    return true;
  } else {
    return { error: res.status };
  }
}
