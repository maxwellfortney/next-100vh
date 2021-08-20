/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    fetchDoesUserFollow,
    fetchUserAvatar,
    followUser,
    unfollowUser,
} from "../../utils/client/users";
import Button100VH from "../UIKit/Buttons/Button100VH";
import FollowButton from "./FollowButton";

export default function Followers({ username }) {
    const [session] = useSession();

    const [loading, setLoading] = useState(true);
    const [followings, setFollowings] = useState<Array<any>>([]);

    async function fetchFollowings() {
        setLoading(true);
        const res = await fetch(`/api/users/${username}/following`);

        if (res.status === 200) {
            const followingsRes = await res.json();

            for (let i = 0; i < followingsRes.length; i++) {
                followingsRes[i].image = await fetchUserAvatar(
                    followingsRes[i].username
                );

                followingsRes[i].isFollowing =
                    session && session?.user?.username
                        ? await fetchDoesUserFollow(
                              session.user.username as string,
                              followingsRes[i].username
                          )
                        : false;
            }
            setFollowings(followingsRes);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchFollowings();
    }, []);

    return (
        <div
            className="flex flex-col items-center justify-start p-4 mx-4 text-white bg-100vh-gray"
            style={{ minWidth: "400px" }}
        >
            <h1 className="self-start mb-4 text-2xl font-semibold text-white">
                following
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
                    {followings.map((following, i) => {
                        return (
                            <div
                                key={following.username}
                                className={`flex items-center justify-between w-full ${
                                    i === followings.length - 1 || i === 0
                                        ? "mb-4"
                                        : ""
                                }`}
                            >
                                <div className="flex items-center">
                                    <img
                                        src={following.image}
                                        className="mr-2 rounded-full h-7"
                                    />
                                    <Link href={`/${following.username}`}>
                                        <a className="font-semibold transition-colors duration-300 border-b border-transparent hover:border-white">
                                            <p>{following.username}</p>
                                        </a>
                                    </Link>
                                </div>
                                <div className="flex">
                                    {session ? (
                                        <>
                                            {session.user.username ==
                                            following.username ? (
                                                <p className="mr-2 text-sm opacity-70">
                                                    you
                                                </p>
                                            ) : (
                                                <FollowButton
                                                    isFollowingProp={
                                                        following.isFollowing
                                                    }
                                                    otherUsername={
                                                        following.username
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
