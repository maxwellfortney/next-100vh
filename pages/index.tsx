/* eslint-disable @next/next/no-img-element */
import Navbar from "../components/Navbar/Navbar";
import AnimatedText from "../components/Home/AnimatedTexts";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

import styles from "../styles/Home/Home.module.css";
import { useEffect } from "react";

export default function Home() {
    const { user, error, isLoading } = useUser();

    useEffect(() => {
        console.log(user);
    });

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="relative flex flex-col items-center justify-center w-full h-screen min-h-screen bg-100vh-gray">
                <AnimatedText />
                <Navbar />
                <div
                    className="flex flex-col items-center justify-center flex-1 w-full h-full text-white"
                    style={{ zIndex: 2 }}
                >
                    <h1 className="w-3/4 mb-20 font-black text-center lg:w-1/2 text-7xl">
                        The leading immersive design platform for developers and
                        artists.
                    </h1>
                    <div className="flex">
                        <div className="flex flex-1 mr-4 text-2xl font-extrabold cursor-pointer group bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                            <Link href="/upload">
                                <a className="flex justify-center w-full px-5 py-3 m-1 transition-colors duration-300 bg-100vh-gray hover:bg-transparent">
                                    upload
                                </a>
                            </Link>
                        </div>
                        <div className="flex flex-1 text-2xl font-extrabold cursor-pointer bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                            <Link href="/inspiration">
                                <a className="flex justify-center w-full px-5 py-3 m-1 transition-colors duration-300 bg-100vh-gray hover:bg-transparent">
                                    browse
                                </a>
                            </Link>
                        </div>
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
        </div>
    );
}
