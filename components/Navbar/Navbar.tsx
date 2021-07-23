import { useState } from "react";
import SignUp from "../SignUp/SignUp";
import Link from "next/link";
import { CSSTransition } from "react-transition-group";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/dist/client/router";

export default function Navbar() {
    const router = useRouter();
    const { query, pathname } = router;

    const [scrollHeight, setScrollHeight] = useState(0);
    const [blurBg, setBlurBg] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const { user, error, isLoading } = useUser();

    function handleButtonClick({ type }: any) {
        if (!blurBg) {
            setBlurBg(true);
            if ((type = "signIn")) {
                setIsSignIn(true);
                setIsSignUp(false);
            } else if (type === "signUp") {
                setIsSignIn(false);
                setIsSignUp(true);
            }
        } else if (isSignIn) {
            setIsSignIn(false);
            setIsSignUp(true);
        } else if (isSignUp) {
            setIsSignIn(true);
            setIsSignUp(false);
        } else {
            setBlurBg(false);
            setIsSignIn(false);
            setIsSignUp(false);
        }
    }

    return (
        <>
            {/* {blurBg ? (

                <div
                    onClick={() => setBlurBg(false)}
                    className="fixed top-0 left-0 z-20 w-screen h-screen bg-black opacity-80"
                >
                    <div className="flex"></div>
                </div>
            ) : null} */}
            <CSSTransition
                in={blurBg}
                timeout={200}
                classNames="fade"
                unmountOnExit
            >
                <SignUp blurBg={blurBg} setBlurBg={setBlurBg} />
            </CSSTransition>
            <div
                className="z-10 flex items-center justify-between w-11/12 mt-10"
                style={{ height: "60px" }}
            >
                <div className="flex items-center h-full">
                    <Link href="/">
                        <a className="text-6xl font-black text-transparent transition-opacity hover:opacity-80 bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                            100vh
                        </a>
                    </Link>
                    <div
                        className="h-full mx-4 bg-white"
                        style={{ width: "3px" }}
                    />
                    <div className="flex items-center h-full text-2xl font-extrabold text-white">
                        <Link href="/jobs">
                            <a
                                className={`${
                                    pathname === "/jobs" ? "border-white" : ""
                                } py-3 mr-4 transition-all duration-300 border-b-2 border-transparent hover:border-white`}
                            >
                                find work
                            </a>
                        </Link>
                        <Link href="/about">
                            <a className="py-3 mr-4 transition-all duration-300 border-b-2 border-transparent hover:border-white">
                                about
                            </a>
                        </Link>
                        <Link href="/inspiration">
                            <a className="py-3 transition-all border-b-2 border-transparent hover:border-white">
                                inspiration
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center h-full text-2xl font-extrabold text-white">
                    {/* <div className="flex mr-4">sign up</div>
                <div className="flex items-center h-full px-4 transition-all hover:bg-100vh-gray hover:from-100vh-gray hover:to-100vh-gray bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                    sign in
                </div> */}
                    {/* <AnimatedButton label="sign up" /> */}
                    {user ? (
                        <>
                            <div className="relative flex mr-2 cursor-pointer group bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                                <div
                                    className="absolute flex transition-all duration-200 opacity-100 bg-100vh-gray group-hover:opacity-0"
                                    style={{
                                        top: "-1px",
                                        left: "-1px",
                                        width: "calc(100% + 2px)",
                                        height: "calc(100% + 2px)",
                                    }}
                                />
                                <Link href={`/${user.nickname}`}>
                                    <a
                                        className={`flex justify-center w-full px-4 py-3 m-1 bg-100vh-gray`}
                                        style={{ zIndex: 1 }}
                                    >
                                        {user.nickname}
                                    </a>
                                </Link>
                            </div>
                            <Link href="/upload">
                                <a className="flex items-center justify-center h-full px-4 bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                                    upload
                                </a>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/api/auth/login">
                                <a className="relative flex mr-2 cursor-pointer group bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                                    <div
                                        className="absolute flex transition-all duration-200 opacity-100 bg-100vh-gray group-hover:opacity-0"
                                        style={{
                                            top: "-1px",
                                            left: "-1px",
                                            width: "calc(100% + 2px)",
                                            height: "calc(100% + 2px)",
                                        }}
                                    />
                                    <div
                                        onClick={() =>
                                            handleButtonClick("signUp")
                                        }
                                        className={`flex justify-center w-full px-5 py-3 m-1 bg-100vh-gray`}
                                        style={{ zIndex: 1 }}
                                    >
                                        sign up
                                    </div>
                                </a>
                            </Link>
                            <Link href="/api/auth/login">
                                <a
                                    onClick={() => handleButtonClick("signIn")}
                                    className="flex items-center justify-center h-full px-4 bg-gradient-to-br from-100vh-cyan to-100vh-purple"
                                >
                                    sign in
                                </a>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
