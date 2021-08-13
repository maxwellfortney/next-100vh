/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { createContext } from "react";

import Navbar from "../components/Navbar/Navbar";
import FromGitRepo from "../components/Upload/FromGitRepo/FromGitRepo";
import UploadFiles from "../components/Upload/UploadFiles/UploadFiles";

export const UploadContext = createContext<any>(null);

export default function Upload() {
    const [session, loading] = useSession();

    const [isHoveringRightDiv, setisHoveringRightDiv] = useState(false);

    const router = useRouter();

    if (loading) return null;

    if (!loading && !session) {
        router.push("/401", router.pathname);
        return null;
    }

    return (
        <UploadContext.Provider
            value={{ isHoveringRightDiv, setisHoveringRightDiv }}
        >
            <div
                className="flex flex-col items-center justify-center w-full min-h-screen bg-100vh-gray"
                style={{ paddingTop: "92px" }}
            >
                <Navbar />
                <div className="flex flex-col items-center justify-center flex-1 w-full text-white">
                    <h1 className="mt-12 text-4xl font-black text-center">
                        Show the world what
                        <br /> you’re working on
                    </h1>
                    <p className="mt-2 text-sm text-gray-400">
                        create a new project
                    </p>
                    <div
                        className="flex items-center justify-center w-full"
                        style={{
                            maxHeight: "calc(100vh - 248px)",
                            minHeight: "calc(100vh - 248px)",
                        }}
                    >
                        <div
                            className="grid w-10/12 grid-cols-1 gap-6 md:grid-cols-2 xl:w-3/4 py-7 h-3/4"
                            style={{
                                maxHeight: "900px",
                                minHeight: "450px",
                                height: "calc((100vh - 248px) * .83)",
                                maxWidth: "1500px",
                            }}
                        >
                            <FromGitRepo />
                            <UploadFiles />
                        </div>
                    </div>
                </div>
            </div>
        </UploadContext.Provider>
    );
}
