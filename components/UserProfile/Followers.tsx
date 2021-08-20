/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchDoesUserFollow, fetchUserAvatar } from "../../utils/client/users";
import FollowButton from "./FollowButton";

export default function Followers({ username }) {
    const [session] = useSession();

    const [loading, setLoading] = useState(true);
    const [followers, setFollowers] = useState<Array<any>>([]);

    async function fetchFollowers() {
        setLoading(true);
        const res = await fetch(`/api/users/${username}/followers`);

        if (res.status === 200) {
            const followersRes = await res.json();

            for (let i = 0; i < followersRes.length; i++) {
                followersRes[i].image = await fetchUserAvatar(
                    followersRes[i].username
                );

                followersRes[i].isFollowing =
                    session && session?.user?.username
                        ? await fetchDoesUserFollow(
                              session.user.username as string,
                              followersRes[i].username
                          )
                        : false;
            }
            console.log(followersRes);
            setFollowers(followersRes);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchFollowers();
    }, []);

    return (
        <div
            className="flex flex-col items-center justify-start p-4 mx-4 text-white bg-100vh-gray"
            style={{ minWidth: "400px" }}
        >
            <h1 className="self-start mb-4 text-2xl font-semibold text-white">
                followers
            </h1>
            {loading ? (
                <svg className="w-20 animate-spin" viewBox="0 0 100 100">
                    <circle
                        fill="none"
                        cx="50"
                        cy="50"
                        r="30"
                        strokeWidth="4"
                        stroke="white"
                        strokeOpacity="0.8"
                        strokeDasharray="283"
                        strokeDashoffset="200"
                    />
                </svg>
            ) : (
                <>
                    {followers.map((follower, i) => {
                        return (
                            <div
                                key={follower.username}
                                className={`flex items-center justify-between w-full ${
                                    i === follower.length - 1 || i === 0
                                        ? "mb-4"
                                        : ""
                                }`}
                            >
                                <div className="flex items-center">
                                    <img
                                        src={follower.image}
                                        className="mr-2 rounded-full h-7"
                                    />
                                    <Link href={`/${follower.username}`}>
                                        <a className="font-semibold transition-colors duration-300 border-b border-transparent hover:border-white">
                                            <p>{follower.username}</p>
                                        </a>
                                    </Link>
                                </div>
                                <div className="flex">
                                    {session ? (
                                        <>
                                            {session.user.username ==
                                            follower.username ? (
                                                <p className="mr-2 text-sm opacity-70">
                                                    you
                                                </p>
                                            ) : (
                                                <FollowButton
                                                    isFollowingProp={
                                                        follower.isFollowing
                                                    }
                                                    otherUsername={
                                                        follower.username
                                                    }
                                                />
                                            )}
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
}
