/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSWRInfinite } from "swr";
import { fetchDoesUserFollow, fetchUserAvatar } from "../../utils/client/users";
import FollowButton from "./FollowButton";

export default function Followers({ username, setShowFollowing }) {
    const [session] = useSession();

    const [loading, setLoading] = useState(true);
    // const [followings, setFollowings] = useState<Array<any>>([]);

    function getKey(pageIndex, previousPageData) {
        if (previousPageData && !previousPageData.length) return null; // reached the end
        return `/api/users/${username}/following?page=${pageIndex}&perPage=10`; // SWR key
    }
    const { data, size, setSize } = useSWRInfinite(getKey, fetchFollowings);

    useEffect(() => {
        console.log(data);
    }, [data]);

    async function fetchFollowings(path) {
        console.log(path);
        setLoading(true);
        const res = await fetch(path);

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
            // setFollowings(followingsRes);
            console.log(followingsRes);
            setLoading(false);
            return followingsRes;
        }
    }

    async function handleScroll(e) {
        console.log(
            (100 * e.target.scrollTop) /
                (e.target.scrollHeight - e.target.clientHeight)
        );

        const scrollPercent =
            (100 * e.target.scrollTop) /
            (e.target.scrollHeight - e.target.clientHeight);

        if (scrollPercent > 75) {
            console.log("increased size");
            setSize(size + 1);
        }

        // if(e.target.scrollOffset)
    }

    return (
        <div
            className="flex flex-col items-center justify-start p-4 mx-4 text-white bg-100vh-gray"
            style={{ minWidth: "400px" }}
        >
            <div className="flex items-center justify-between w-full">
                <h1 className="mb-4 text-2xl font-semibold text-white">
                    following
                </h1>
                <svg
                    onClick={() => setShowFollowing(false)}
                    className="self-start w-6 h-6 transition-opacity duration-300 cursor-pointer hover:opacity-70"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </div>
            <div
                className="flex flex-col items-center justify-start w-full overflow-y-auto"
                onScroll={handleScroll}
                style={{ maxHeight: "440px" }}
            >
                {!data ? (
                    <svg className="w-6 animate-spin" viewBox="0 0 100 100">
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
                        {data.map((followings, i) => {
                            return followings.map((following, j) => {
                                return (
                                    // eslint-disable-next-line react/jsx-key
                                    <div
                                        // key={following.username}
                                        className={`flex items-center justify-between w-full ${
                                            i === data.length - 1 &&
                                            j === followings.length - 1
                                                ? ""
                                                : "mb-4"
                                        }`}
                                    >
                                        <div className="flex items-center">
                                            <img
                                                src={following.image}
                                                className="mr-2 rounded-full h-7"
                                            />
                                            <Link
                                                href={`/${following.username}`}
                                            >
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
                            });
                        })}
                    </>
                )}
            </div>
        </div>
    );
}
