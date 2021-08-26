/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";
import { CreateContext } from "../../../pages/create";
import Box100VH from "../../UIKit/Boxes/Box100VH";
import Text100VH from "../../UIKit/Text/Text100VH";
import SelectOrganization from "./SelectOrganization";
import SelectRepo from "./SelectRepo";

export const FromGitRepoContext = createContext<any>(null);

export default function FromGitRepo() {
    const [session, loading] = useSession();
    const [defaultOrg, setDefaultOrg] = useState<any>(null);
    const [activeOrg, setActiveOrg] = useState<any>(null);

    const [repos, setRepos] = useState<any>(null);
    const [searchString, setSearchString] = useState("");

    const { activeDiv, setActiveDiv } = useContext(CreateContext);

    async function fetchDefaultOrg() {
        const res = await fetch(`/api/integrations/${session?.provider}/user`);

        if (res.status === 200) {
            const userJson = await res.json();
            if (userJson) {
                console.log(userJson);

                if (session?.provider === "github") {
                    setDefaultOrg({
                        image: userJson.avatar_url,
                        name: userJson.login,
                        reposUrl: userJson.repos_url,
                        url: userJson.url,
                        isDefault: true,
                    });
                    setActiveOrg({
                        image: userJson.avatar_url,
                        name: userJson.login,
                        reposUrl: userJson.repos_url,
                        url: userJson.url,
                        isDefault: true,
                    });
                } else if (session?.provider === "bitbucket") {
                    setDefaultOrg({
                        image: userJson.links.avatar.href,
                        name: userJson.display_name,
                        reposUrl: userJson.links.repositories.href,
                        url: userJson.links.html,
                        isDefault: true,
                    });
                    setActiveOrg({
                        image: userJson.links.avatar.href,
                        name: userJson.display_name,
                        reposUrl: userJson.links.repositories.href,
                        url: userJson.links.html,
                        isDefault: true,
                    });
                } else if (session?.provider === "gitlab") {
                    setDefaultOrg({
                        image: userJson.avatar_url,
                        name: userJson.username,
                        reposUrl: userJson.web_url,
                        url: userJson.web_url,
                        isDefault: true,
                    });
                    setActiveOrg({
                        image: userJson.avatar_url,
                        name: userJson.username,
                        reposUrl: userJson.web_url,
                        url: userJson.web_url,
                        isDefault: true,
                    });
                }
            }
        }
    }

    useEffect(() => {
        if (session && session?.accessToken) {
            if (!["google", "email"].includes(session.provider as string)) {
                fetchDefaultOrg();
            }
        }
    }, [session]);

    return (
        <FromGitRepoContext.Provider
            value={{
                repos,
                setRepos,
                defaultOrg,
                activeOrg,
                setActiveOrg,
                searchString,
            }}
        >
            <Box100VH
                onMouseEnter={() => {
                    setActiveDiv("FromGitRepo");
                }}
                isActive={activeDiv === "FromGitRepo"}
                className="flex flex-col items-center justify-start p-3"
                style={{ minHeight: "450px" }}
            >
                <h1 className="self-start mb-3 text-2xl font-bold">
                    import {session?.provider} repo
                </h1>
                <div className="flex justify-between w-full max-w-full">
                    <SelectOrganization />
                    <div className="flex items-center justify-start flex-1 px-2 py-2.5 border border-gray-400">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            className="w-full min-w-0 px-1 outline-none bg-100vh-gray"
                            placeholder="search"
                            value={searchString}
                            onChange={(e) => {
                                setSearchString(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <SelectRepo />
                <Text100VH
                    label="import from git url →"
                    className="self-start cursor-pointer text-md"
                />
            </Box100VH>
        </FromGitRepoContext.Provider>
    );
}
