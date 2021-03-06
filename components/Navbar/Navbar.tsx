/* eslint-disable @next/next/no-html-link-for-pages */
import { useEffect, useState } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { CSSTransition } from "react-transition-group";
import { useRouter } from "next/dist/client/router";

import { signIn, signOut, useSession } from "next-auth/client";
import Button100VH from "../UIKit/Buttons/Button100VH";
import DropdownToggle from "./DropdownToggle";

export default function Navbar() {
    const [session, loading] = useSession();

    const router = useRouter();
    const { pathname } = router;

    const [menuOpen, setMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    useEffect(() => {
        console.log(session);
    }, [session]);

    useEffect(() => {
        document
            .querySelector("#main-container")
            ?.addEventListener("scroll", () => {
                if (
                    Math.abs(
                        scrollY -
                            (document?.querySelector("#main-container")
                                ?.scrollTop as number)
                    ) > 10
                ) {
                    setScrollY(
                        document?.querySelector("#main-container")
                            ?.scrollTop as number
                    );
                    console.log(scrollY);
                }
            });
    }, []);

    useEffect(() => {
        document.addEventListener("mousemove", (e) => {
            if (Math.abs(mouseY - e.clientY) > 10) {
                setMouseY(e.clientY);
            }
        });
    }, []);

    return (
        <>
            <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <div
                className="fixed z-10 flex items-center justify-between mt-8 transition-all duration-300"
                style={{
                    height: "60px",
                    width: "95%",
                    top:
                        process.browser &&
                        scrollY > document.documentElement.clientHeight / 2 &&
                        mouseY > document.documentElement.clientHeight * 0.2
                            ? "-100px"
                            : "0",
                }}
            >
                <div className="flex items-center h-full">
                    <Link href="/">
                        <a className="text-5xl font-black text-transparent transition-opacity duration-300 md:text-6xl hover:opacity-40 bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                            100vh
                        </a>
                    </Link>
                    <div
                        className="hidden h-full mx-4 bg-white md:flex"
                        style={{ width: "3px" }}
                    />
                    <div className="items-center hidden h-full text-xl font-extrabold text-white md:flex">
                        <Link href="/jobs">
                            <a
                                className={`${
                                    pathname === "/jobs" ? "border-white" : ""
                                } py-3 mr-4 transition-all duration-500 border-b-2 border-transparent hover:border-white`}
                                style={{ marginTop: "2px" }}
                            >
                                find work
                            </a>
                        </Link>
                        <Link href="/about">
                            <a
                                style={{ marginTop: "2px" }}
                                className="py-3 mr-4 transition-all duration-500 border-b-2 border-transparent hover:border-white"
                            >
                                about
                            </a>
                        </Link>
                        <Link href="/inspiration">
                            <a
                                style={{ marginTop: "2px" }}
                                className="py-3 transition-all duration-500 border-b-2 border-transparent hover:border-white"
                            >
                                inspiration
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="flex md:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className={`hamburger hamburger--slider
            ${menuOpen ? "is-active" : ""}`}
                        type="button"
                    >
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>
                </div>
                <div className="items-start hidden h-full text-xl font-extrabold text-white md:flex">
                    {session ? (
                        <>
                            <DropdownToggle session={session} />
                            <a
                                href="/create"
                                className={`relative flex items-center justify-center font-extrabold group bg-gradient-to-br from-100vh-cyan to-100vh-purple px-5 py-4 ml-2`}
                            >
                                <div
                                    className="absolute transition-colors duration-300 bg-transparent group-hover:bg-100vh-gray"
                                    style={{
                                        width: "calc(100% - 8px)",
                                        height: "calc(100% - 8px)",
                                    }}
                                />
                                <p style={{ zIndex: 1 }}>create</p>
                            </a>
                        </>
                    ) : (
                        <>
                            <Button100VH
                                styleType={1}
                                label="sign up"
                                isLink={true}
                                href="/signup"
                            />

                            <Button100VH
                                styleType={3}
                                label="sign in"
                                isLink={true}
                                href="/signin"
                                className="px-5 py-4 ml-2"
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
