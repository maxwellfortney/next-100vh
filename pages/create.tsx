/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { createContext } from "react";

import Navbar from "../components/Navbar/Navbar";
import FromGitRepo from "../components/Create/FromGitRepo/FromGitRepo";
import UploadFiles from "../components/Create/UploadFiles/UploadFiles";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import FinishCreate from "../components/Create/FinishCreate/FinishCreate";

export const CreateContext = createContext<any>(null);

export default function Upload() {
    const [session, loading] = useSession();

    const [htmlFile, setHtmlFile] = useState<any>(null);
    const [cssFile, setCssFile] = useState<any>(null);
    const [jsFile, setJsFile] = useState<any>(null);
    const [showFinishCreate, setShowFinishCreate] = useState(false);

    const [activeDiv, setActiveDiv] = useState("FromGitRepo");

    const router = useRouter();

    if (loading) return null;

    if (!loading && !session) {
        router.push("/401", router.pathname);
        return null;
    }

    return (
        <CreateContext.Provider
            value={{
                activeDiv,
                setActiveDiv,
                htmlFile,
                setHtmlFile,
                cssFile,
                setCssFile,
                jsFile,
                setJsFile,
                showFinishCreate,
                setShowFinishCreate,
            }}
        >
            <div
                className="flex flex-col items-center justify-center w-full h-full min-h-screen bg-100vh-gray"
                style={{ paddingTop: "92px" }}
            >
                <Navbar />
                <div className="flex flex-col items-center justify-center flex-1 w-full h-full text-white animate-fadeIn">
                    <div
                        className={`relative flex flex-col items-center justify-center flex-1 w-full ${
                            showFinishCreate ? "mt-14 mb-20" : ""
                        }`}
                    >
                        <SwitchTransition mode="out-in">
                            <CSSTransition
                                key={showFinishCreate as any}
                                addEndListener={(node, done) => {
                                    node.addEventListener(
                                        "transitionend",
                                        done,
                                        false
                                    );
                                }}
                                classNames="fade"
                            >
                                {showFinishCreate ? (
                                    <FinishCreate />
                                ) : (
                                    <>
                                        <h1 className="mt-12 text-4xl font-black text-center">
                                            Show the world what
                                            <br /> you’re working on
                                        </h1>
                                        <p className="mt-2 text-sm text-gray-400">
                                            create a new project
                                        </p>
                                        <div className="relative flex items-center justify-center flex-1 w-full">
                                            <div className="absolute flex items-center justify-center w-full h-full">
                                                <div
                                                    className={`grid w-11/12 grid-cols-1 gap-6 md:w-5/6 h-3/4 ${
                                                        showFinishCreate
                                                            ? ""
                                                            : "lg:grid-cols-2"
                                                    } xl:w-3/4 py-7`}
                                                    style={{
                                                        // maxHeight: "900px",
                                                        // minHeight: "450px",
                                                        // height: "calc((100vh - 248px) * .83)",
                                                        maxWidth: "1500px",
                                                    }}
                                                >
                                                    <FromGitRepo />
                                                    <UploadFiles />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </CSSTransition>
                        </SwitchTransition>
                    </div>
                </div>
            </div>
        </CreateContext.Provider>
    );
}
