import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { CreateContext } from "../../../pages/create";
import RenderPreview from "./RenderPreview";

const titleRegex = new RegExp("^[A-Za-z0-9][A-Za-z0-9_\\-\\. ]{0,34}$");

export default function FinishCreate() {
    const [projectTitle, setProjectTitle] = useState("");

    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<Array<any>>([]);

    const [waitingPublish, setWaitingPublish] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");
    const [userProjectTitles, setUserProjectTitles] = useState<any>([]);
    const [titleIsValid, setTitleIsValid] = useState(false);

    const { htmlFile, cssFile, jsFile } = useContext(CreateContext);

    const [session] = useSession();

    const router = useRouter();

    function validateTitle(title) {
        setInfoMessage("");

        if (!titleRegex.test(title)) {
            setTitleIsValid(false);
            setInfoMessage("invalid characters");
        } else {
            setTitleIsValid(true);
        }
        if (title[0] === ".") {
            setInfoMessage(`can't start with "."`);
        }
        if (title[0] === "-") {
            setInfoMessage(`can't start with "-"`);
        }
        if (title[0] === "_") {
            setInfoMessage(`can't start with "_"`);
        }
        if (title[0] === " ") {
            setInfoMessage(`can't start with " "`);
        }
        if (userProjectTitles.includes(title)) {
            setInfoMessage("duplicate title");
            setTitleIsValid(false);
        }

        if (title.length > 35) {
            setInfoMessage("too long");
        }
    }

    function handleChangeTitle(e) {
        if (e.target.value.length > 0) {
            validateTitle(e.target.value);
        } else {
            setInfoMessage("");
        }
        setProjectTitle(e.target.value);
    }

    function handleChangeTag(e) {
        setTagInput(e.target.value);
    }

    function handleChangeTagKeyDown(e) {
        if (e.key === "Enter") {
            setTags([...tags, tagInput]);
            setTagInput("");
        }
        if (
            e.key === "Backspace" &&
            projectTitle.length === 0 &&
            tags.length > 0
        ) {
            setTags(tags.filter((tag, i) => i !== tags.length - 1));
        }
    }

    async function publishProject() {
        setWaitingPublish(true);
        const res = await fetch(
            `/api/user/projects/createProject?title=${projectTitle}${
                htmlFile ? "&html=" + htmlFile.text : ""
            }${cssFile ? "&css=" + cssFile.text : ""}${
                jsFile ? "&js=" + jsFile.text : ""
            }`
        );

        if (res.status === 200) {
            router.push("/" + (session as any).user.username);
        } else {
            setWaitingPublish(false);
        }
    }

    async function fetchProjectTitles() {
        const res = await fetch("/api/user/projects/getTitles");

        if (res.status === 200) {
            const titles = await res.json();
            setUserProjectTitles(titles);
        }
    }

    useEffect(() => {
        fetchProjectTitles();
    }, []);

    return (
        <div className="absolute flex flex-col items-center justify-center w-full h-full">
            <div className="flex flex-col items-center justify-center w-11/12 h-full md:w-5/6">
                <p
                    className="self-start ml-1 text-red-600"
                    style={{ minHeight: "24px" }}
                >
                    {infoMessage}
                </p>
                <div className="flex items-center justify-between w-full mb-4">
                    <input
                        className="self-start w-full pr-2 text-5xl outline-none bg-100vh-gray"
                        placeholder="enter title"
                        value={projectTitle}
                        onChange={handleChangeTitle}
                    />
                    <CSSTransition
                        in={(projectTitle.length > 0) as any}
                        addEndListener={(node, done) => {
                            node.addEventListener("transitionend", done, false);
                        }}
                        classNames="fade"
                        unmountOnExit
                    >
                        <button
                            disabled={!titleIsValid}
                            onClick={publishProject}
                            className={`h-full px-3 relative flex items-center justify-center font-extrabold group bg-gradient-to-br from-100vh-cyan to-100vh-purple ${
                                !titleIsValid ? "opacity-60" : ""
                            }`}
                        >
                            <div
                                className="absolute transition-colors duration-300 bg-transparent group-hover:bg-100vh-gray"
                                style={{
                                    width: `calc(100% - 8px)`,
                                    height: `calc(100% - 8px)`,
                                }}
                            />
                            {waitingPublish ? (
                                <svg
                                    className={`w-5 h-5 text-white animate-spin`}
                                    style={{ width: "59px" }}
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
                                <p style={{ zIndex: 1 }}>publish</p>
                            )}
                        </button>
                    </CSSTransition>
                </div>
                <div className="flex w-full h-full">
                    <RenderPreview />
                </div>
                <div className="flex items-center w-full mt-4 mb-8">
                    {tags.map((tag) => {
                        return (
                            <Tag
                                setTags={setTags}
                                tags={tags}
                                key={tag}
                                title={tag}
                            />
                        );
                    })}
                    <input
                        className="min-w-0 py-1.5 text-lg outline-none bg-100vh-gray"
                        placeholder="+ add a tag"
                        value={tagInput}
                        onChange={handleChangeTag}
                        onKeyDown={handleChangeTagKeyDown}
                    />
                </div>
            </div>
        </div>
    );
}

function Tag({ title, setTags, tags }) {
    function handleRemoveTag() {
        setTags(tags.filter((tag) => tag !== title));
    }

    return (
        <div className="flex items-center h-full px-1 mr-2 font-semibold animate-fadeIn bg-gradient-to-br from-100vh-cyan to-100vh-purple">
            <p className="mb-0.5">{title}</p>
            <svg
                onClick={handleRemoveTag}
                className="w-4 h-4 ml-1 transition-opacity cursor-pointer hover:opacity-70"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    );
}
