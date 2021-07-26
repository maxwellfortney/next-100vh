/* eslint-disable @next/next/no-img-element */
import Navbar from "../components/Navbar/Navbar";
import AnimatedText from "../components/Home/AnimatedTexts";
import Link from "next/link";

import styles from "../styles/Home/Home.module.css";
import { useEffect } from "react";

export default function Home() {
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
          className="flex flex-col items-center justify-center flex-1 w-full h-full text-white"
          style={{ zIndex: 2 }}
        >
          <h1 className="w-11/12 mb-8 text-5xl font-black text-center md:mb-12 2xl:mb-20 lg:w-3/4 2xl:w-1/2 lg:text-7xl">
            The leading immersive design platform for developers and artists.
          </h1>
          <div className="flex text-xl">
            <div className="flex flex-1 mr-4 font-extrabold cursor-pointer group bg-gradient-to-br from-100vh-cyan to-100vh-purple">
              <Link href="/upload">
                <a className="flex justify-center w-full px-5 py-3 m-1 transition-colors duration-300 bg-100vh-gray hover:bg-transparent">
                  upload
                </a>
              </Link>
            </div>
            <div className="flex flex-1 font-extrabold cursor-pointer bg-gradient-to-br from-100vh-cyan to-100vh-purple">
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
            <div className={`${styles["mouseIcon"]} m-1 bg-100vh-gray`}></div>
          </div>
        </div>
      </div>
      <div
        style={{ scrollSnapAlign: "start" }}
        className="flex w-full h-screen min-h-screen bg-red-400"
      >
        a
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
