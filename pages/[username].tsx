/* eslint-disable @next/next/no-img-element */
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar/Navbar";

export default function UserPage() {
    const router = useRouter();
    const { query } = router;

    const { user, error, isLoading } = useUser();

    useEffect(() => {
        console.log(query);
        if (query.username === "upload") {
            router.push("/upload");
        } else if (query.username === "jobs") {
            router.push("/jobs");
        }
    });

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-100vh-gray">
            <Navbar />
            <div className="flex flex-col flex-1 w-11/12">
                <div className="flex justify-between w-full">
                    <div className="flex flex-col self-start mt-20 text-white">
                        {user && user.picture ? (
                            <>
                                <img
                                    src={user.picture}
                                    className="rounded-full w-44"
                                    alt={
                                        user.nickname
                                            ? user.nickname
                                            : "A 100vh user"
                                    }
                                />
                                <h1 className="text-6xl font-extrabold">
                                    {user.nickname}
                                </h1>
                                <p className="mt-1 text-2xl lg:text-2xl">
                                    1.3m followers
                                </p>
                            </>
                        ) : null}
                    </div>
                    <div className="flex flex-col items-center self-end justify-between flex-none text-white">
                        <Link href="/api/auth/logout">
                            <a className="flex mb-10">logout</a>
                        </Link>
                        <div className="flex text-xl font-extrabold ">
                            <div className="flex flex-1 mr-4 cursor-pointer group bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                                <div className="flex justify-center w-full px-5 py-2 m-1 transition-colors duration-300 bg-100vh-gray hover:bg-transparent">
                                    follow
                                </div>
                            </div>
                            <div className="flex items-center justify-center h-full px-4 py-3 bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                                message
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full mb-4 mt-14">
                    <div className="flex items-center text-xl font-bold text-white lg:text-2xl">
                        <p className="mr-2">projects</p>
                        <p className="text-transparent mr-7 bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                            4
                        </p>
                        <p className="mr-2">liked projects</p>
                        <p className="text-transparent mr-7 bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                            1,430
                        </p>
                        <p>about</p>
                    </div>
                </div>
                <div
                    className="w-full bg-white mb-7"
                    style={{ height: "2px" }}
                />
                <div
                    className="grid grid-cols-3 gap-4"
                    style={{
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(30vw, 1fr))",
                    }}
                >
                    <div className="flex bg-red-400 h-80">a</div>
                    <div className="flex bg-red-400 h-80">a</div>
                    <div className="flex bg-red-400 h-80">a</div>
                    <div className="flex bg-red-400 h-80">a</div>
                </div>
            </div>
        </div>
    );
}
