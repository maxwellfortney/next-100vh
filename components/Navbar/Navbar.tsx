import { useState } from "react";
import Link from "next/link";
import SignUpButton from "./SignUpButton";
import SignInButton from "./SignInButton";

export default function Navbar() {
    const [scrollHeight, setScrollHeight] = useState(0);

    return (
        <div
            className="z-10 flex items-center justify-between w-11/12 mt-10"
            style={{ height: "60px" }}
        >
            <div className="flex items-center h-full">
                <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                    100vh
                </h1>
                <div
                    className="h-full mx-4 bg-white"
                    style={{ width: "3px" }}
                />
                <div className="flex items-center text-2xl font-extrabold text-white">
                    <Link href="/jobs">
                        <a className="mr-4">find work</a>
                    </Link>
                    <Link href="/about">
                        <a className="mr-4">about</a>
                    </Link>
                    <Link href="/inspiration">
                        <a>inspiration</a>
                    </Link>
                </div>
            </div>
            <div className="flex items-center h-full text-2xl font-extrabold text-white">
                {/* <div className="flex mr-4">sign up</div>
                <div className="flex items-center h-full px-4 transition-all hover:bg-100vh-gray hover:from-100vh-gray hover:to-100vh-gray bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                    sign in
                </div> */}
                {/* <AnimatedButton label="sign up" /> */}
                <SignUpButton />
                <SignInButton />
            </div>
        </div>
    );
}
