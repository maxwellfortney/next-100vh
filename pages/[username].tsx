/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar/Navbar";

import { signIn, signOut, useSession } from "next-auth/client";
import Button100VH from "../components/UIKit/Buttons/Button100VH";
import Projects from "../components/UserProfile/Projects";

export default function UserPage() {
    const [session, loading] = useSession();

    const router = useRouter();
    const { query } = router;

    useEffect(() => {
        console.log(query);
        if (query.username === "upload") {
            router.push("/upload");
        } else if (query.username === "jobs") {
            router.push("/jobs");
        } else if (query.username === "about") {
            router.push("/about");
        }
    }, []);

    return (
        <div
            className="flex flex-col items-center justify-center w-full min-h-screen bg-100vh-gray"
            style={{ paddingTop: "92px" }}
        >
            <Navbar />
            <div className="flex flex-col flex-1 w-11/12">
                <div className="flex justify-between w-full">
                    <div className="flex flex-col self-start mt-20 text-white">
                        {session && session.user?.image ? (
                            <>
                                <img
                                    src={session.user?.image}
                                    className="rounded-full w-44"
                                    alt={
                                        session.user?.name
                                            ? session.user?.name
                                            : "A 100vh user"
                                    }
                                />
                                <h1 className="text-6xl font-extrabold">
                                    {session.user?.name}
                                </h1>
                                <p className="mt-1 text-xl">1.3m followers</p>
                            </>
                        ) : null}
                    </div>
                    <div className="flex flex-col items-center self-end justify-between flex-none text-white">
                        <a
                            onClick={() =>
                                signOut({
                                    callbackUrl: "http://localhost:3000/",
                                })
                            }
                            className="flex mb-10"
                        >
                            logout
                        </a>
                        <div className="flex text-xl font-extrabold ">
                            <Button100VH
                                styleType={2}
                                label="follow"
                                className="mr-2"
                            />
                            <Button100VH
                                styleType={3}
                                label="message"
                                className="px-4"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex w-full mb-3 mt-14">
                    <div className="flex items-center text-xl font-bold text-white">
                        <div className="flex items-center transition-opacity duration-300 cursor-pointer hover:opacity-50">
                            <p className="mr-2">projects</p>
                            <p className="text-transparent mr-7 bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                                4
                            </p>
                        </div>
                        <div className="flex items-center transition-opacity duration-300 cursor-pointer hover:opacity-50">
                            <p className="mr-2">liked projects</p>
                            <p className="text-transparent mr-7 bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                                1,430
                            </p>
                        </div>

                        <div className="flex items-center transition-opacity duration-300 cursor-pointer hover:opacity-50">
                            <p>about</p>
                        </div>
                    </div>
                </div>
                <div
                    className="w-full mb-6 bg-white"
                    style={{ height: "2px" }}
                />
                <Projects />
            </div>
        </div>
    );
}
