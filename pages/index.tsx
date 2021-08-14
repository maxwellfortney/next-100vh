/* eslint-disable @next/next/no-img-element */
import Navbar from "../components/Navbar/Navbar";
import AnimatedText from "../components/Home/AnimatedTexts";
import Link from "next/link";

import styles from "../styles/Home/Home.module.css";
import Button100VH from "../components/UIKit/Buttons/Button100VH";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/client";

export default function Home() {
    const [session, loading] = useSession();

    if (loading) return null;

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
                        The leading immersive design platform for developers and
                        artists.
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
                        <div
                            className={`${styles["mouseIcon"]} m-1 bg-100vh-gray`}
                        ></div>
                    </div>
                </div>
            </div>
            <div
                style={{ scrollSnapAlign: "start" }}
                className="flex w-full h-screen min-h-screen bg-red-400"
            >
                <div
                    id="testDiv"
                    className="flex flex-col items-center justify-start w-full h-full text-white bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400"
                >
                    <div className="flex justify-between w-11/12 mt-3">
                        <div className="flex items-center">
                            <h1 className="text-5xl font-black">Test Page</h1>
                        </div>
                        <div className="flex items-center text-xl font-medium">
                            <a className="py-4 mr-2 transition-all border-b-2 border-transparent cursor-pointer hover:border-white">
                                Home
                            </a>
                            <a className="py-4 mr-2 transition-all border-b-2 border-transparent cursor-pointer hover:border-white">
                                About
                            </a>
                            <a className="py-4 transition-all border-b-2 border-transparent cursor-pointer hover:border-white">
                                Contact
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center justify-center flex-1">
                        <h1 className="text-5xl font-black text-center text-white md:text-6xl lg:text-7xl">
                            The best test page you have ever seen.
                        </h1>
                    </div>
                </div>
            </div>
            <div
                style={{ scrollSnapAlign: "start" }}
                className="flex w-full h-screen min-h-screen bg-yellow-400"
            >
                a
            </div>
        </div>
    );
}
