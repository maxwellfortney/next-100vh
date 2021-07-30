/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";

import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en";
import Button100VH from "../components/UIKit/Buttons/Button100VH";
TimeAgo.addDefaultLocale(en);

export default function Upload() {
    const [repos, setRepos] = useState([]);
    const session = useSession();

    async function fetchRepos() {
        const repoFetch = await fetch(
            "/api/upload/github/getRepos/" + "maxwellfortney"
        );
        setRepos(await repoFetch.json());
    }

    useEffect(() => {
        if (session) {
            fetchRepos();
        }
    }, []);

    return (
        <div
            className="flex flex-col items-center justify-center w-full min-h-screen bg-100vh-gray"
            style={{ paddingTop: "92px" }}
        >
            <Navbar />
            <div className="flex flex-col items-center justify-center flex-1 w-full text-white">
                <h1 className="mt-12 text-4xl font-black text-center">
                    Show the world what
                    <br /> you’re working on
                </h1>
                <p className="mt-2 text-sm text-gray-400">
                    import from a git repo or upload your code
                </p>
                <div
                    className="flex items-center justify-center w-full"
                    style={{
                        maxHeight: "calc(100vh - 248px)",
                        minHeight: "calc(100vh - 248px)",
                    }}
                >
                    <div className="flex-1 h-full">c</div>
                    <div
                        className="flex items-center justify-center w-3/4 h-full py-7"
                        style={{
                            maxHeight: "calc(100vh - 248px)",
                            minHeight: "313px",
                            height: "calc(100vh - 248px)",
                        }}
                    >
                        <div className="relative flex flex-col items-center justify-start flex-1 h-full px-3 py-2 mr-auto border-2 border-dashed rounded-md">
                            <div className="flex flex-col w-full h-full mb-2 overflow-y-auto">
                                {/* <div className="absolute bottom-0 z-10 flex w-full h-1/5 bg-gradient-to-r from-black to-transparent" /> */}
                                {repos.length > 0 ? (
                                    repos.map((repo: any) => (
                                        <RepoButton
                                            key={repo.name}
                                            repo={repo}
                                        />
                                    ))
                                ) : (
                                    <div className="m-auto loader"></div>
                                )}
                            </div>
                            <div className="mr-auto text-sm text-transparent bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                                import from git url →
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center flex-none w-1/2 h-full p-4 ml-4 text-sm border-2 border-dashed rounded-md">
                            <div className="flex flex-col items-center justify-center flex-1 w-full">
                                <img
                                    src="/images/gradient-image.svg"
                                    className="w-2/5"
                                    alt="gradient image icon"
                                />
                                <ul className="w-5/6 list-disc text-start mt-7">
                                    <li>code (HTML, CSS, JavaScript)</li>
                                    <li>images (png, jpg, gif)</li>
                                </ul>
                                <ul className="w-5/6 list-disc text-start">
                                    <li>videos (mp4, 10mb max)</li>
                                    <li>
                                        only upload media you own the rights to
                                    </li>
                                </ul>
                            </div>
                            <button className="text-transparent bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                                drag and drop or browse
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 h-full">b</div>
                </div>
            </div>
        </div>
    );
}

function RepoButton({ repo }) {
    return (
        <div
            key={repo.name}
            className="flex items-center justify-between w-full my-1"
        >
            <div className="flex items-center text-sm">
                <p className="mr-1 font-bold">{repo.name}</p>
                {repo.private ? (
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                ) : (
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                        />
                    </svg>
                )}
                <p className="mx-1">·</p>
                <ReactTimeAgo
                    date={new Date(repo.updatedAt)}
                    timeStyle="mini"
                />
                <p className="ml-1">ago</p>
            </div>
            {/* <button className="px-2 py-1 text-sm font-semibold bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                import
            </button> */}
            <Button100VH
                styleType={3}
                label="import"
                className="px-2 py-1 mr-1"
            />
        </div>
    );
}
