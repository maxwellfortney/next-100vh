/* eslint-disable @next/next/no-img-element */
import Navbar from "../components/Navbar/Navbar";
import AnimatedText from "../components/Home/AnimatedTexts";
import Link from "next/link";

import styles from "../styles/Home/Home.module.css";
import Button100VH from "../components/UIKit/Buttons/Button100VH";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/client";
import { useState } from "react";
import ProjectIFrame from "../components/Project/ProjectIFrame";

export default function Home() {
  const [session, loading] = useSession();
  const [projects, setProjects] = useState<Array<any>>([]);

  useEffect(() => {
    if (!loading) {
      fetchPopularProject();
    }
  }, []);

  if (loading) return null;

  async function fetchPopularProject() {
    const res = await fetch(`/api/projects`);

    if (res.status === 200) {
      const projectsRes = await res.json();
      if (projectsRes) {
        setProjects(projectsRes);
      }
    }
  }

  return (
    <div
      id="main-container"
      className="flex flex-col items-center justify-start w-full max-h-screen overflow-x-hidden overflow-y-scroll"
      style={{ scrollSnapType: "y mandatory" }}
    >
      <div
        style={{ scrollSnapAlign: "start", paddingTop: "92px" }}
        className="relative flex flex-col items-center justify-center w-full h-screen min-h-screen bg-100vh-gray"
      >
        <AnimatedText />
        <Navbar />
        <div
          className="flex flex-col items-center justify-center flex-1 w-full h-full text-white animate-fadeAndRise"
          style={{ zIndex: 2 }}
        >
          <h1 className="w-11/12 mb-8 text-5xl font-black text-center md:mb-12 2xl:mb-20 lg:w-3/4 2xl:w-1/2 lg:text-7xl">
            The leading immersive design platform for developers and artists.
          </h1>

          <div className="flex text-xl">
            <Button100VH
              styleType={2}
              label={!loading && !session ? "about" : "create"}
              isLink={true}
              href={!loading && !session ? "/about" : "/create"}
              className="mr-2"
            />
            <Button100VH
              styleType={2}
              label="browse"
              isLink={true}
              href="/inspiration"
              onClick={() => signOut()}
            />
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center mb-4 animate-bounce">
          <p className="font-bold text-white">popular projects</p>
          <div
            className={`mt-2 bg-gradient-to-br from-100vh-cyan to-100vh-purple ${styles["mouseWrapper"]}`}
          >
            <div className={`${styles["mouseIcon"]} m-1 bg-100vh-gray`}></div>
          </div>
        </div>
      </div>
      {projects.map((project) => {
        return (
          <div
            key={project.title + project.ownerUsername}
            style={{ scrollSnapAlign: "start" }}
            className="flex w-full h-screen min-h-screen"
          >
            <ProjectIFrame
              html={project.html}
              css={project.css}
              js={project.js}
            />
          </div>
        );
      })}
    </div>
  );
}
