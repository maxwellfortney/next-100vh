/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/client";
import { useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import AnOrganization from "./AnOrganization";

import { FromGitRepoContext } from "./FromGitRepo";
import { useContext } from "react";

export default function SelectOrganization() {
    const { activeOrg, setActiveOrg, defaultOrg } =
        useContext(FromGitRepoContext);

    const [isOpen, setIsOpen] = useState(false);
    const [session, loading] = useSession();
    const [orgs, setOrgs] = useState<any>([]);

    async function handleClick() {
        if (!isOpen) {
            if (session?.provider === "github") {
                const res = await fetch(
                    "/api/integrations/github/getOrgs/" + session?.accessToken
                );

                if (res.status === 200) {
                    const orgsJson = await res.json();
                    if (orgsJson) {
                        console.log(orgsJson);
                        setOrgs(orgsJson);
                    }
                }
            } else if (session?.provider === "gitlab") {
                const res = await fetch("/api/integrations/gitlab/groups");

                if (res.status === 200) {
                    const orgsJson = await res.json();
                    if (orgsJson) {
                        console.log(orgsJson);
                        setOrgs(orgsJson);
                    }
                }
            } else if (session?.provider === "bitbucket") {
                const res = await fetch(
                    "/api/integrations/bitbucket/user/workspaces"
                );

                if (res.status === 200) {
                    const orgsJson = await res.json();
                    if (orgsJson) {
                        console.log(orgsJson);
                        setOrgs(orgsJson);
                    }
                }
            }
        }

        setIsOpen(!isOpen);
    }

    return (
        <button
            onClick={handleClick}
            className="relative flex items-center justify-start flex-none w-3/5 px-2 py-2.5 mr-2 border border-gray-400 bg-gradient-to-br from-100vh-cyan to-100vh-purple"
        >
            <div className="absolute left-0 w-full h-full transition-opacity opacity-100 bg-100vh-gray hover:opacity-0" />
            <div className="flex items-center w-full pointer-events-none">
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={(activeOrg === null) as any}
                        addEndListener={(node, done) => {
                            node.addEventListener("transitionend", done, false);
                        }}
                        classNames="fade-fast"
                    >
                        {activeOrg !== null && activeOrg !== undefined ? (
                            <>
                                {/* <FaGithub className="z-10 text-lg" /> */}
                                <img
                                    src={activeOrg.image}
                                    className="z-10 w-6 h-6"
                                />
                                <div className="relative flex items-center flex-1 text-left">
                                    <p className="absolute left-0 w-full px-2 truncate overflow-ellipsis">
                                        {activeOrg.name}
                                    </p>
                                </div>
                                <svg
                                    className={`z-10 w-5 h-5 ease-in-out transition-all ${
                                        isOpen ? "rotate-180 transform" : ""
                                    }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </>
                        ) : (
                            <svg
                                className={`w-5 ml-1 h-5 text-white animate-spin`}
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-10"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                ></circle>
                                <path
                                    className="opacity-90"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        )}
                    </CSSTransition>
                </SwitchTransition>
            </div>
            <div
                className={`border border-gray-400 absolute left-0 z-10 origin-top transform flex flex-col w-full mt-3 transition-all top-full bg-100vh-gray ${
                    isOpen
                        ? "visible opacity-100 scale-y-100"
                        : "invisible opacity-0 scale-y-50"
                }`}
            >
                {activeOrg && !activeOrg.isDefault && defaultOrg && (
                    <AnOrganization
                        image={defaultOrg.image}
                        name={defaultOrg.name}
                        reposUrl={defaultOrg.reposUrl}
                        url={defaultOrg.url}
                        setActiveOrg={setActiveOrg}
                        isDefault={true}
                    />
                )}
                {orgs.length > 0 &&
                    orgs.map((org) => {
                        if (session?.provider === "github") {
                            if (org.login !== activeOrg.name) {
                                return (
                                    <AnOrganization
                                        key={org.login}
                                        image={org.avatar_url}
                                        name={org.login}
                                        reposUrl={org.repos_url}
                                        url={org.url}
                                        setActiveOrg={setActiveOrg}
                                    />
                                );
                            }
                        } else if (session?.provider === "gitlab") {
                            if (org.name !== activeOrg.name) {
                                return (
                                    <AnOrganization
                                        key={org.name}
                                        image={
                                            org.avatar_url ||
                                            "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                                        }
                                        name={org.name}
                                        reposUrl={`https://gitlab.com/api/v4/groups/${org.id}/projects`}
                                        url={org.web_url}
                                        setActiveOrg={setActiveOrg}
                                    />
                                );
                            }
                        } else if (session?.provider === "bitbucket") {
                            if (org.name !== activeOrg.name) {
                                return (
                                    <AnOrganization
                                        key={org.name}
                                        image={org.links.avatar.href}
                                        name={org.name}
                                        reposUrl={org.links.respositories.href}
                                        url={org.links.html.href}
                                        setActiveOrg={setActiveOrg}
                                    />
                                );
                            }
                        }
                    })}
                <div
                    className="relative flex items-center justify-start w-full bg-gradient-to-br from-100vh-cyan to-100vh-purple"
                    style={{ height: "46px" }}
                >
                    <div className="absolute w-full h-full transition-opacity opacity-100 bg-100vh-gray hover:opacity-0"></div>
                    <div className="z-10 flex items-center justify-start">
                        <svg
                            className="w-6 h-6 mx-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                        <p>add an organization</p>
                    </div>
                </div>
            </div>
        </button>
    );
}
