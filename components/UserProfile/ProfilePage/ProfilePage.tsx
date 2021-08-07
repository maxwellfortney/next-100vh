import { abbreviateNumber } from "js-abbreviation-number";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import Button100VH from "../../UIKit/Buttons/Button100VH";
import Text100VH from "../../UIKit/Text/Text100VH";
import About from "../About";
import LikedProjects from "../LikedProjects";
import ProfileImage from "../ProfileImage";
import Projects from "../Projects";

export default function ProfilePage({
    username,
    name,
    image,
    followers,
    following,
    projectLikes,
    projects,
    bio,
    isVerified,
    createdAt,
    menuView,
    setMenuView,
}) {
    const router = useRouter();

    const [session, loading] = useSession();
    const [isPrivate, setIsPrivate] = useState(false);

    const [didFetchDoesFollow, setDidFetchDoesFollow] = useState(false);
    const [doesFollow, setDoesFollow] = useState(false);

    const [followersOffset, setFollowersOffset] = useState(0);

    async function fetchDoesFollow() {
        if (!didFetchDoesFollow) {
            const res = await fetch(
                `/api/users/doesUserFollowUser/${
                    (session?.user as any).username
                }?toUsername=${username}`
            );

            if (res.status === 200) {
                const doesFollowJson = await res.json();

                setDoesFollow(doesFollowJson.doesFollow);
                setDidFetchDoesFollow(true);
            } else {
                console.log(res.status);
            }
        }
    }

    useEffect(() => {
        if (session) {
            if ((session.user as any).username === username) {
                setIsPrivate(true);
            } else {
                fetchDoesFollow();
            }
        }
    }, [session]);

    function FollowButton() {
        const [isHovering, setIsHovering] = useState(false);
        const [isLoadingAction, setIsLoadingAction] = useState(false);

        async function handleFollowButtonClick() {
            console.log(doesFollow);

            if (session) {
                if (didFetchDoesFollow) {
                    if (doesFollow) {
                        setIsLoadingAction(true);
                        const res = await fetch(
                            "/api/user/unfollow/" + username
                        );

                        console.log(await res.text());
                        if (res.status === 200) {
                            setDoesFollow(false);
                            setFollowersOffset(followersOffset - 1);
                        }
                        setIsLoadingAction(false);
                    } else {
                        setIsLoadingAction(true);
                        const res = await fetch("/api/user/follow/" + username);

                        console.log(await res.text());
                        if (res.status === 200) {
                            setDoesFollow(true);
                            setFollowersOffset(followersOffset + 1);
                        }
                        setIsLoadingAction(false);
                    }
                }
            }
        }

        return (
            <button
                onClick={handleFollowButtonClick}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className={`group flex mr-2 font-extrabold cursor-pointer group bg-gradient-to-br from-100vh-cyan to-100vh-purple`}
            >
                <div className="flex items-center justify-center w-full px-5 py-3 m-1 transition-all duration-300 bg-100vh-gray hover:bg-transparent">
                    {isLoadingAction ? (
                        <svg
                            className={`w-5 h-5 text-white animate-spin my-1 mx-5`}
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-10"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    ) : (
                        <>
                            {doesFollow ? (
                                <>
                                    <p className="absolute transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                                        unfollow
                                    </p>
                                    <p className="absolute transition-opacity duration-200 opacity-100 group-hover:opacity-0">
                                        following
                                    </p>
                                    {/* Psuedo Element */}
                                    <p className="opacity-0">following</p>
                                </>
                            ) : (
                                "follow"
                            )}
                        </>
                    )}
                </div>
            </button>
        );
    }

    function FollowersCounter() {
        return (
            <a className="flex items-center pb-1 mt-1 text-xl transition-colors duration-300 border-b-2 border-transparent cursor-pointer hover:border-white">
                <p className="font-bold">
                    {abbreviateNumber(followers + followersOffset, 1, {
                        symbols: ["", "k", "m", "g", "t", "p", "e"],
                    })}
                </p>
                <p className="ml-1">
                    follower{followers + followersOffset === 1 ? "" : "s"}
                </p>
            </a>
        );
    }

    function FollowingCounter() {
        return (
            <a className="flex items-center pb-1 mt-1 ml-2 text-xl transition-colors duration-300 border-b-2 border-transparent cursor-pointer hover:border-white">
                <p className="font-bold">
                    {abbreviateNumber(following, 1, {
                        symbols: ["", "k", "m", "g", "t", "p", "e"],
                    })}
                </p>
                <p className="ml-1">following</p>
            </a>
        );
    }

    function UserName() {
        return (
            <div className={`flex items-center`}>
                <h1 className="mt-3 text-6xl font-extrabold">{name}</h1>
                {/* 
        {isPrivate && (
          <svg
            className="self-end w-5 h-5 mb-1 ml-2 md:w-4 md:h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        )} */}
                {isVerified ? (
                    <svg
                        className="self-end ml-2 w-7 h-7"
                        viewBox="0 0 20 20"
                        // fill="currentColor"
                    >
                        <rect x="5" y="6" width="10" height="8" fill="white" />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20V20ZM14.6337 8.38375C14.8614 8.148 14.9874 7.83224 14.9846 7.5045C14.9817 7.17675 14.8503 6.86324 14.6185 6.63148C14.3868 6.39972 14.0732 6.26826 13.7455 6.26541C13.4178 6.26256 13.102 6.38855 12.8663 6.61625L8.75 10.7325L7.13375 9.11625C6.898 8.88855 6.58224 8.76256 6.2545 8.76541C5.92675 8.76826 5.61324 8.89972 5.38148 9.13148C5.14972 9.36324 5.01826 9.67675 5.01541 10.0045C5.01256 10.3322 5.13855 10.648 5.36625 10.8837L7.86625 13.3837C8.10066 13.6181 8.41854 13.7497 8.75 13.7497C9.08146 13.7497 9.39934 13.6181 9.63375 13.3837L14.6337 8.38375V8.38375Z"
                            fill="url(#paint0_linear)"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear"
                                x1="3.125"
                                y1="3.125"
                                x2="10.625"
                                y2="20"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#00FFFF" />
                                <stop offset="1" stopColor="#8000FF" />
                            </linearGradient>
                        </defs>
                    </svg>
                ) : (
                    <>
                        {/* Uncomment when we have verification !!!!!!!!!!!!!!!!!!!!!!!!!! */}
                        {/* {session ? (
                            <Text100VH
                                className="self-end ml-2 text-sm cursor-pointer"
                                label="apply for verification"
                                defaultGradient={true}
                            />
                        ) : null} */}
                    </>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 w-11/12">
            <div className="relative flex justify-between w-full">
                <div className="flex flex-col self-start mt-16 text-white animate-fadeIn">
                    <ProfileImage image={image} />
                    <UserName />
                    <div className="flex">
                        <FollowersCounter />
                        <FollowingCounter />
                    </div>
                </div>
                <div className="flex flex-col items-center self-end justify-between flex-none text-white">
                    <div className="flex items-center text-xl font-extrabold">
                        {session ? (
                            <>
                                {(session.user as any).username !== username ? (
                                    <FollowButton />
                                ) : (
                                    <>
                                        {isPrivate && (
                                            <Link href="/settings">
                                                <a
                                                    style={{
                                                        transitionDuration:
                                                            "400ms",
                                                    }}
                                                    className="mr-4 text-white transition-all transform rotate-0 hover:opacity-70 w-7 h-7 hover:rotate-90"
                                                >
                                                    <svg
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1.5}
                                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={1.5}
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                    </svg>
                                                </a>
                                            </Link>
                                        )}
                                    </>
                                )}
                                <Button100VH
                                    styleType={3}
                                    label={
                                        (session.user as any).username ==
                                        username
                                            ? "messages"
                                            : "message"
                                    }
                                    className="px-4 py-4"
                                />
                            </>
                        ) : (
                            <Button100VH
                                styleType={2}
                                label="sign up to message"
                                isLink={true}
                                href="/signup"
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="flex w-full mt-10 mb-3">
                <div className="flex items-center text-xl font-bold text-white">
                    <a
                        onClick={() => {
                            router.push(
                                {
                                    pathname: `${username}`,
                                },
                                undefined,
                                { shallow: true }
                            );
                            setMenuView("projects");
                        }}
                        className="flex items-center transition-opacity duration-300 cursor-pointer hover:opacity-50"
                    >
                        <p className="mr-2">projects</p>
                        <p className="text-transparent mr-7 bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                            {projects.length}
                        </p>
                    </a>

                    {projectLikes && projectLikes.length > 0 && (
                        <a
                            onClick={() => {
                                router.push(
                                    {
                                        pathname: `${username}/likedProjects`,
                                    },
                                    undefined,
                                    { shallow: true }
                                );
                                setMenuView("likedProjects");
                            }}
                            className="flex items-center transition-opacity duration-300 cursor-pointer hover:opacity-50"
                        >
                            <p className="mr-2">liked projects</p>
                            <p className="text-transparent mr-7 bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                                {projectLikes.length}
                            </p>
                        </a>
                    )}

                    <a
                        onClick={() => {
                            router.push(
                                {
                                    pathname: `${username}/about`,
                                },
                                undefined,
                                { shallow: true }
                            );
                            setMenuView("about");
                        }}
                        className="flex items-center transition-opacity duration-300 cursor-pointer hover:opacity-50"
                    >
                        <p>about</p>
                    </a>
                </div>
            </div>
            <div className="w-full mb-6 bg-white" style={{ height: "2px" }} />
            {menuView === "projects" && <Projects />}
            {menuView === "likedProjects" && <LikedProjects />}
            {menuView === "about" && <About bio={bio} createdAt={createdAt} />}
        </div>
    );
}
