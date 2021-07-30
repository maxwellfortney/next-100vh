/* eslint-disable @next/next/no-img-element */
import Navbar from "../components/Navbar/Navbar";
import AnimatedText from "../components/Home/AnimatedTexts";
import Link from "next/link";

import styles from "../styles/Home/Home.module.css";
import Button100VH from "../components/UIKit/Buttons/Button100VH";
import { useEffect } from "react";

export default function Home() {
    // const getGeneratedPageURL = ({ html, css, js }) => {
    //     const getBlobURL = (code, type) => {
    //         const blob = new Blob([code], { type });
    //         return URL.createObjectURL(blob);
    //     };

    //     const cssURL = getBlobURL(css, "text/css");
    //     const jsURL = getBlobURL(js, "text/javascript");

    //     const source = `
    //       <html>
    //         <head>
    //           ${
    //               css &&
    //               `<link rel="stylesheet" type="text/css" href="${cssURL}" />`
    //           }
    //           ${js && `<script src="${jsURL}"></script>`}
    //         </head>
    //         <body>
    //           ${html || ""}
    //         </body>
    //       </html>
    //     `;

    //     return getBlobURL(source, "text/html");
    // };

    // useEffect(() => {
    //     const url = getGeneratedPageURL({
    //         html: "<p className=`font-black`>Hello, world!</p>",
    //         css: "p { color: blue; }",
    //         js: 'console.log("hi")',
    //     });

    //     const iframe = document.querySelector("#iframe");
    //     (iframe as any).src = url;
    // }, []);

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
                            label="upload"
                            isLink={true}
                            href="/upload"
                            className="mr-2"
                        />
                        <Button100VH
                            styleType={2}
                            label="browse"
                            isLink={true}
                            href="/inspiration"
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
