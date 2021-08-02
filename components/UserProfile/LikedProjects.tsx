import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useEffect } from "react";
import AProject from "./AProject";
import type { AProjectType } from "./AProject";

export default function LikedProjects() {
  const router = useRouter();
  const { username } = router.query;

  const [projects, setProjects] = useState<Array<any>>([]);

  async function getProjects() {
    const res = await fetch("/api/projects/getProjects/" + username);

    if (res.status === 200) {
      const projects = await res.json();
      console.log(projects);
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
      className="grid gap-4"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(550px, 1fr))",
      }}
    >
      {projects ? (
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
                htmlString={project.htmlString}
                cssString={project.cssString}
                i={i}
              />
            );
          })}
        </>
      ) : null}
      {/* <div className="flex bg-red-400 h-80">a</div>
            <div className="flex bg-red-400 h-80">a</div>
            <div className="flex bg-red-400 h-80">a</div>
            <div className="flex bg-red-400 h-80">a</div> */}
    </div>
  );
}
