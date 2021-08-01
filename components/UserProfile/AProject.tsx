import { useState } from "react";
import { useEffect } from "react";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);
import ReactTimeAgo from "react-time-ago";
import { useSession } from "next-auth/client";

export interface AProjectType {
    _id: string;
    views: number;
    likes: number;
    title: string;
    ownerUsername: string;
    createdAt: string;
    updatedAt: string;
    htmlString: string;
    cssString: string;
    i: number;
}

export default function AProject({
    _id,
    views,
    likes,
    title,
    ownerUsername,
    createdAt,
    updatedAt,
    htmlString,
    cssString,
    i,
}: AProjectType) {
    const [session, loading] = useSession();
    const [isHovering, setIsHovering] = useState(false);

    const [didFetchIsLiked, setDidFetchIsLiked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const getGeneratedPageURL = ({ html, css, js }) => {
        const getBlobURL = (code, type) => {
            const blob = new Blob([code], { type });
            return URL.createObjectURL(blob);
        };

        const cssURL = getBlobURL(css, "text/css");
        const jsURL = getBlobURL(js, "text/javascript");

        const source = `
          <html>
            <head>
            <meta name="viewport" content="width=device-width, initial-scale=.5">

            <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
            ${
                css
                    ? `<link rel="stylesheet" type="text/css" href="${cssURL}" />`
                    : ""
            }
              ${js ? `<script src="${jsURL}"></script>` : ""}
            </head>
            <body>
                <div class="overflow-hidden">
                    <div class="absolute" style="transform: scale(0.5, 0.5); width: 200%; height: 200%; left: -50%; top: -50%">
                        ${html || ""}
                    </div>
                </div>            
            </body>
          </html>
        `;

        return getBlobURL(source, "text/html");
    };

    useEffect(() => {
        const url = getGeneratedPageURL({
            html: htmlString,
            css: cssString,
            js: "console.log('xss')",
        });

        const iframe = document.querySelector(`#${ownerUsername}-Project-${i}`);
        (iframe as any).src = url;
    }, []);

    function nodeToString(node) {
        var tmpNode = document.createElement("div");
        tmpNode.appendChild(node.cloneNode(true));
        var str = tmpNode.innerHTML;
        return str;
    }

    useEffect(() => {
        if (document.querySelector("#testDiv")) {
            const testHtml = nodeToString(document.querySelector("#testDiv"));
            console.log(testHtml);
        }
    }, []);

    async function didUserLikeProject() {
        const res = await fetch(
            "/api/projects/getDoesUserLikeProject/" +
                (session?.user as any).username +
                "/?projectId=" +
                _id
        );

        if (res.status === 200) {
            const userDidLike = await res.json();
            console.log(userDidLike);
            setIsLiked(userDidLike);
        } else {
            console.log("bad");
        }
    }

    async function handleMouseEnter() {
        if (!didFetchIsLiked) {
            await didUserLikeProject();
            setDidFetchIsLiked(true);
        }
    }

    return (
        <>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setIsHovering(false)}
                className={`group relative flex w-full overflow-hidden bg-red-400 mb-4`}
                style={{ height: "35vh" }}
            >
                <div className="absolute bottom-0 flex items-center justify-end w-full transition-opacity duration-300 opacity-0 h-1/4 bg-gradient-to-t from-black to-transparent group-hover:opacity-60"></div>
                <div
                    className="absolute bottom-0 flex items-center justify-center w-full transition-opacity duration-300 opacity-0 h-1/4 group-hover:opacity-100"
                    style={{ zIndex: 1 }}
                >
                    <div className="flex items-center justify-between w-11/12 text-2xl text-white">
                        <div className="flex items-center flex-1 font-bold">
                            <p>{title}</p>
                            {/* <p className="mx-2 text-xs">■</p> */}
                            <p className="ml-3 text-sm font-normal">
                                <ReactTimeAgo date={createdAt} locale="en-US" />
                            </p>
                        </div>
                        <div className="flex items-center">
                            {/* <AiOutlineHeart className=" hover:text-red-600" /> */}
                            <AnimatedHeart
                                isLiked={isLiked}
                                setIsLiked={setIsLiked}
                            />
                            <p className="ml-2 text-sm font-normal">{likes}</p>
                        </div>
                    </div>
                </div>
                <iframe
                    id={`${ownerUsername}-Project-${i}`}
                    className="w-full h-full overflow-hidden"
                />
                {/* <p>{title}</p> */}
            </div>
            {/* 
            <div
                id="testDiv"
                className="flex flex-col items-center justify-start w-full h-full text-white bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400"
            >
                <div className="flex justify-between w-11/12 mt-3">
                    <div className="flex items-center">
                        <h1 className="text-5xl font-black">Test Page</h1>
                    </div>
                    <div className="flex items-center text-xl font-medium">
                        <a className="py-4 mr-2 transition-all border-b-2 border-transparent cursor-pointer hover:border-white">
                            Home
                        </a>
                        <a className="py-4 mr-2 transition-all border-b-2 border-transparent cursor-pointer hover:border-white">
                            About
                        </a>
                        <a className="py-4 transition-all border-b-2 border-transparent cursor-pointer hover:border-white">
                            Contact
                        </a>
                    </div>
                </div>
                <div className="flex items-center justify-center flex-1">
                    <h1 className="text-5xl font-black text-center text-white md:text-6xl lg:text-7xl">
                        The best test page you have ever seen.
                    </h1>
                </div>
            </div> */}
        </>
    );
}

function AnimatedHeart({ isLiked, setIsLiked }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <svg
            onClick={() => setIsLiked(!isLiked)}
            className="w-7"
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
    );
}
