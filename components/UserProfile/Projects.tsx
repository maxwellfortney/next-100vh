import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useEffect } from "react";
import AProject from "./AProject";
import type { AProjectType } from "./AProject";
import { useSession } from "next-auth/client";
import Box100VH from "../UIKit/Boxes/Box100VH";

export default function Projects() {
    const router = useRouter();
    const { username } = router.query;

    const [session, loading] = useSession();

    const [projects, setProjects] = useState<Array<any>>([]);

    async function getProjects() {
        const res = await fetch("/api/projects/getProjects/" + username);

        const projects = await res.json();
        console.log(projects);

        if (res.status === 200 && projects) {
            setProjects(projects);
        }
    }

    useEffect(() => {
        if (username) {
            getProjects();
        }
    }, [username]);

    return (
        <div
            className="grid grid-cols-1 gap-4 2xl:grid-cols-2"
            style={
                {
                    // gridTemplateColumns: "repeat(auto-fill, minmax(700px, 1fr))",
                }
            }
        >
            {projects ? (
                <>
                    {projects.length > 0 ? (
                        <>
                            {projects.map((project: AProjectType, i) => {
                                return (
                                    <AProject
                                        key={i}
                                        _id={project._id}
                                        views={project.views}
                                        likes={project.likes}
                                        title={project.title}
                                        ownerUsername={project.ownerUsername}
                                        createdAt={project.createdAt}
                                        updatedAt={project.updatedAt}
                                        html={project.html}
                                        css={project.css}
                                        js={project.js}
                                        i={i}
                                    />
                                );
                            })}
                        </>
                    ) : (
                        <>
                            {session &&
                            (session.user as any).username == username ? (
                                <Box100VH
                                    isLink={true}
                                    href="/create"
                                    className="flex items-center justify-center cursor-pointer"
                                    style={{ height: "35vh" }}
                                >
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                </Box100VH>
                            ) : (
                                <div
                                    className="relative flex items-start justify-start w-full mb-4 overflow-hidden font-semibold text-white group"
                                    style={{ height: "35vh" }}
                                >
                                    this user has no projects :(
                                </div>
                            )}
                        </>
                    )}
                </>
            ) : null}
        </div>
    );
}
