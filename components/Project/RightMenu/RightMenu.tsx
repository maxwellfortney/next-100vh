import { abbreviateNumber } from "js-abbreviation-number";
import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { useState } from "react";
import { doesUserLikeProject } from "../../../utils/client/projects";
import Box100VH from "../../UIKit/Boxes/Box100VH";
import Button100VH from "../../UIKit/Buttons/Button100VH";
import Comments from "./Comments/Comments";
import NewComment from "./NewComment";

export default function RightMenu({ project }) {
    const [session, loading] = useSession();
    const [isLiked, setIsLiked] = useState(false);
    const [likesState, setLikesState] = useState(project.likes);

    const [didFetchIsLiked, setDidFetchIsLiked] = useState(false);

    async function handleToggleLike() {
        if (didFetchIsLiked) {
            //toggle the like
            const res = await fetch(
                `/api/users/${project.ownerUsername}/projects/${project.title}/likes`,
                {
                    method: isLiked ? "DELETE" : "POST",
                }
            );

            console.log(await res.text());

            if (res.status === 204) {
                setLikesState(likesState + (isLiked ? -1 : 1));
                setIsLiked(!isLiked);
            }
        }
    }

    async function fetchDoesUserLike() {
        if (!didFetchIsLiked) {
            const doesLike = await doesUserLikeProject(
                (session?.user as any).username,
                project.ownerUsername,
                project.title
            );
            setIsLiked(doesLike);
            setDidFetchIsLiked(true);
        }
    }

    useEffect(() => {
        if (session && !loading) {
            fetchDoesUserLike();
        }
    }, [loading]);

    return (
        <div className="flex flex-col w-full px-3 text-base">
            <div className="flex items-center justify-between w-full mb-7">
                <svg
                    className="transition-opacity cursor-pointer h-7 hover:opacity-60"
                    viewBox="0 0 20 20"
                >
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
                    <path
                        fill="url(#paint0_linear)"
                        d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"
                    />
                </svg>

                <p className="text-base transition-opacity cursor-pointer hover:opacity-60">
                    •••
                </p>
            </div>
            <div className="flex w-full text-lg">
                <div className="flex items-center justify-center w-full mr-3 bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                    <div className="flex items-center justify-center w-full py-2 m-1 overflow-hidden bg-100vh-gray">
                        <AnimatedHeart isLiked={isLiked} className="mr-2" />
                        <p>
                            {abbreviateNumber(likesState, 1, {
                                symbols: ["", "k", "m", "g", "t", "p", "e"],
                            })}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-center w-full bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                    <div className="flex items-center justify-center w-full py-2 m-1 overflow-hidden bg-100vh-gray">
                        {/* <AnimatedHeart isLiked={isLiked} className="mr-2" /> */}
                        <svg
                            className="h-6 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                                fillRule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <p>
                            {abbreviateNumber(project.views, 1, {
                                symbols: ["", "k", "m", "g", "t", "p", "e"],
                            })}
                        </p>
                    </div>
                </div>
            </div>
            <NewComment
                projectTitle={project.title}
                projectOwnerUsername={project.ownerUsername}
            />

            <Comments project={project} />
        </div>
    );

    function AnimatedHeart({ isLiked, className = "" }) {
        const [isHovered, setIsHovered] = useState(false);

        return (
            <button
                className={`h-6 ${className}`}
                onClick={session ? handleToggleLike : undefined}
            >
                <svg
                    className="h-full"
                    viewBox="0 0 513 512"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <path
                        id="Fill"
                        className={`text-transparent fill-current transition-colors duration-300 ${
                            isLiked ? "text-red-600" : ""
                        }`}
                        d="M256 468C496.53 306.06 489 211 489 211L478 126L449 73L366 43L293 68L265 108L248 104L223 66L163 47L123 44L78 56L55 77L38 109L23 160L21 209L24 241L43 267C43 267 75 304.89 77 310C79 315.11 113 348 113 348L150 379L180 404L213 433C213 433 266.33 462.3 256 468Z"
                    />
                    <path
                        id="Outline"
                        className={`text-white fill-current transition-colors duration-300 ${
                            isHovered || isLiked ? "text-red-600" : ""
                        }`}
                        fillRule="evenodd"
                        d="M236.21 476.08C215.52 457.99 195.58 441 177.99 426L177.9 425.93C126.32 381.97 81.77 344.01 50.78 306.61C16.14 264.81 0 225.17 0 181.87C0 139.8 14.43 100.99 40.62 72.58C67.12 43.83 103.49 28 143.03 28C172.59 28 199.65 37.34 223.48 55.77C235.5 65.07 246.4 76.45 256 89.73C265.61 76.45 276.5 65.07 288.53 55.77C312.35 37.34 339.42 28 368.97 28C408.51 28 444.88 43.83 471.39 72.58C497.58 100.99 512 139.8 512 181.87C512 225.17 495.87 264.81 461.22 306.61C430.23 344.01 385.69 381.96 334.12 425.92C316.49 440.93 296.52 457.96 275.79 476.09C270.32 480.87 263.29 483.52 256 483.52C248.71 483.52 241.68 480.88 236.21 476.08ZM62.66 92.91C41.59 115.76 29.99 147.36 29.99 181.87C29.99 218.29 43.52 250.86 73.87 287.48C103.2 322.87 146.83 360.05 197.35 403.1L197.44 403.18C215.1 418.23 235.12 435.29 255.96 453.51C276.92 435.26 296.97 418.17 314.66 403.09C365.18 360.04 408.8 322.87 438.13 287.48C468.48 250.86 482.01 218.29 482.01 181.87C482.01 147.36 470.41 115.76 449.34 92.91C428.58 70.39 400.04 57.99 368.97 57.99C346.21 57.99 325.32 65.23 306.87 79.49C290.43 92.21 278.98 108.29 272.26 119.54C268.81 125.32 262.73 128.78 256 128.78C249.27 128.78 243.19 125.32 239.74 119.54C233.03 108.29 221.57 92.21 205.13 79.49C186.68 65.23 165.79 57.99 143.03 57.99C111.96 57.99 83.43 70.39 62.66 92.91Z"
                    />
                </svg>
            </button>
        );
    }
}
