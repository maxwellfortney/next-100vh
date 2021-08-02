export async function doesUserLikeProject(username: string, projectId: string) {
  const res = await fetch(
    "/api/projects/getDoesUserLikeProject/" +
      username +
      "/?projectId=" +
      projectId
  );

  if (res.status === 200) {
    const userDidLike = await res.json();
    return userDidLike;
  } else {
    return { error: res.status };
  }
}
