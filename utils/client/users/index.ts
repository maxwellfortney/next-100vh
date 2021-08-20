export async function fetchUserAvatar(username: string) {
    const res = await fetch(`/api/users/${username}/avatar`);

    if (res.status === 200) {
        const resJson = await res.json();
        return resJson.image;
    } else {
        return false;
    }
}

export async function fetchDoesUserFollow(
    username: string,
    otherUsername: string
): Promise<boolean> {
    const res = await fetch(
        process.env.NODE_ENV === "production"
            ? (process.env.PROD_URL as string)
            : "http://localhost:3000" +
                  `/api/users/${username}/following/${otherUsername}`
    );

    console.log(otherUsername);

    if (res.status === 200) {
        const resJson = await res.json();
        console.log("isFollowing ", resJson.isFollowing);
        return resJson.isFollowing;
    } else {
        return false;
    }
}

export async function followUser(username: string, otherUsername: string) {
    const res = await fetch(
        `/api/users/${username}/following/${otherUsername}`,
        {
            method: "PUT",
        }
    );

    if (res.status === 200) {
        return await res.json();
    } else {
        return false;
    }
}

export async function unfollowUser(username: string, otherUsername: string) {
    const res = await fetch(
        `/api/users/${username}/following/${otherUsername}`,
        {
            method: "DELETE",
        }
    );

    if (res.status === 200) {
        return await res.json();
    } else {
        return false;
    }
}
