/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { session, signIn, signOut, useSession } from "next-auth/client";
import Head from "next/head";
// import ProjectIFrame from "../../components/Project/ProjectIFrame";
import Navbar from "../../../components/Navbar/Navbar";
import RightMenu from "../../../components/Project/RightMenu/RightMenu";
import TopMenu from "../../../components/Project/TopMenu/TopMenu";
import { addViewToProject } from "../../../utils/client/projects";

import dynamic from "next/dynamic";
const ProjectIFrame = dynamic(
    () => import("../../../components/Project/ProjectIFrame"),
    { ssr: false }
);

export async function getServerSideProps(context) {
    const { username, title } = context.params;
    console.log("1 ", context.params);
    console.log("2 ", typeof title);
    console.log("3 ", title);

    const res = await fetch(
        `${
            process.env.NODE_ENV === "production"
                ? process.env.PROD_URL
                : "http://localhost:3000"
        }/api/users/getProjectForUser/${username}?title=${title}`
    );

    if (res.status === 200) {
        const project = await res.json();

        return {
            props: {
                username,
                title,
                project,
            },
        };
    } else {
        return {
            redirect: {
                destination: "/404",
                permanent: false,
            },
        };
    }
}

export default function UserPage({ username, title, project }) {
    const [showMenus, setShowMenus] = useState(true);

    useEffect(() => {
        console.log(project);
    }, []);

    useEffect(() => {
        const didView =
            localStorage.getItem(`didViewProject/${username}/${title}`) ===
            "true";
        console.log(didView);

        if (!didView) {
            localStorage.setItem(`didViewProject/${username}/${title}`, "true");
            addViewToProject(project._id);
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen text-4xl text-white">
            <TopMenu
                showMenus={showMenus}
                setShowMenus={setShowMenus}
                project={project}
            />
            <div className="flex w-full h-full">
                <div className="relative flex w-full">
                    <div className="absolute flex flex-col items-center justify-start w-full h-full">
                        <div
                            className={`flex w-12 h-5 transition-opacity bg-100vh-gray ${
                                showMenus ? "opacity-0" : "opac opacity-100"
                            }`}
                            onClick={() => {
                                setShowMenus(!showMenus);
                            }}
                        ></div>
                    </div>
                    <ProjectIFrame
                        html={project.html}
                        css={project.css}
                        js={project.js}
                    />

                    {/* <div className="flex w-full h-full bg-red-200"></div> */}
                </div>
                <div
                    className={`flex  transition-all duration-300 flex-none`}
                    style={{ width: showMenus ? "325px" : "0px" }}
                >
                    <RightMenu project={project} />
                </div>
            </div>
        </div>
    );
}
