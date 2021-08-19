import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useEffect } from "react";
import AProject from "./AProject";
import type { AProjectType } from "./AProject";
import { useSession } from "next-auth/client";
import Box100VH from "../UIKit/Boxes/Box100VH";

export default function LikedProjects() {
    const router = useRouter();
    const { username } = router.query;

    const [session] = useSession();

    const [loading, setLoading] = useState(true);

    const [projects, setProjects] = useState<Array<any>>([]);

    async function getProjects() {
        setLoading(true);
        const res = await fetch("/api/users/" + username + "/projects");

        const projects = await res.json();
        console.log(projects);

        if (res.status === 200 && projects) {
            setProjects(projects);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (username) {
            getProjects();
        } else {
            console.log("no username !!");
        }
    }, []);

    return (
        <div
            className="grid grid-cols-1 gap-4 text-white md:grid-cols-2 2xl:grid-cols-3"
            style={
                {
                    // gridTemplateColumns: "repeat(auto-fill, minmax(700px, 1fr))",
                }
            }
        >
            {loading ? (
                <div
                    className="flex items-center justify-center w-full h-full"
                    style={{ "--aspect-ratio": 16 / 9 } as any}
                >
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
                </div>
            ) : (
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
                                iFrameScale={0.5}
                            />
                        );
                    })}
                </>
            )}
        </div>
    );
}
