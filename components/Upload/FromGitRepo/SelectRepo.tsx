import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { useContext } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { FromGitRepoContext } from "./FromGitRepo";
import ARepo from "./ARepo";

export default function SelectRepo() {
    const [session] = useSession();

    const { activeOrg, repos, setRepos, searchString } =
        useContext(FromGitRepoContext);

    async function fetchRepos() {
        const res = await fetch(
            `/api/integrations/github/${
                activeOrg.isDefault ? "getReposForUser" : "getReposForOrg"
            }/${session?.accessToken}${
                !activeOrg.isDefault ? `?org=${activeOrg.name}` : ""
            }`
        );

        if (res.status === 200) {
            const repoArr = await res.json();

            console.log(repoArr);
            setRepos(repoArr);
        }
    }

    useEffect(() => {
        if (activeOrg && session) {
            fetchRepos();
        }
    }, [activeOrg, session]);

    return (
        <div className="relative flex flex-1 w-full my-3">
            <div className="absolute top-0 left-0 flex flex-col w-full h-full overflow-y-scroll border border-gray-400">
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={(repos.length === 0) as any}
                        addEndListener={(node, done) => {
                            node.addEventListener("transitionend", done, false);
                        }}
                        classNames="fade-fast"
                    >
                        {repos.length === 0 ? (
                            <svg
                                className={`w-5 m-auto h-5 text-white animate-spin`}
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
                        ) : (
                            <>
                                {repos
                                    .filter(
                                        (repo) =>
                                            repo.name.indexOf(searchString) !==
                                            -1
                                    )
                                    .map((repo) => {
                                        return (
                                            <ARepo
                                                key={repo.name}
                                                name={repo.name}
                                                isPrivate={repo.private}
                                                updatedAt={repo.updated_at}
                                            />
                                        );
                                    })}
                            </>
                        )}
                    </CSSTransition>
                </SwitchTransition>
            </div>
        </div>
    );
}
