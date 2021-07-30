import { getSession, signIn, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Button100VH from "../../components/UIKit/Buttons/Button100VH";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if ((session?.user as any)?.username) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    } else {
        return {
            props: {},
        };
    }
}

export default function New() {
    const router = useRouter();
    const { query } = router;
    const { error, provider } = query;

    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");

    const [isAvailable, setIsAvailable] = useState(false);

    const [session, loading] = useSession();

    async function handleInput(e) {
        setUsername(e.target.value);
        // setIsLoading(true);
        await validateUsername(e.target.value);
    }

    async function validateUsername(username) {
        const res = await fetch("/api/validateUsername/" + username);
        const { isAvailable } = await res.json();
        setIsAvailable(isAvailable);

        console.log(isAvailable);
    }

    async function handleSubmit() {
        const res = await fetch("/api/user/setUsername/" + username);

        if (res.status === 200) {
            await getSession();
            // router.push("/");
            signIn(provider as string, {
                callbackUrl: "http://localhost:3000",
            });
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-100vh-gray">
            <div className="flex mt-8" style={{ width: "95%" }}>
                <a className="text-5xl font-black text-transparent transition-opacity duration-300 md:text-6xl hover:opacity-40 bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                    100vh
                </a>
            </div>
            <div className="flex flex-col items-center justify-start flex-1 w-11/12 px-2 text-white">
                <h1 className="self-start w-11/12 mt-20 text-6xl font-extrabold md:w-3/4 xl:w-1/2 lg:text-7xl">
                    thank you for signing up for 100vh.
                </h1>
                {/* <p className="self-start mt-5 text-xl">one last step...</p> */}
                <h2 className="self-start w-11/12 mt-5 text-6xl font-semibold">
                    please enter your username
                </h2>
                <div className="flex flex-col items-center justify-center flex-1 my-3">
                    <div
                        className="flex items-center self-start"
                        style={{ minHeight: "28px" }}
                    >
                        {isLoading ? (
                            <svg
                                className={`mr-auto w-4 h-4 mb-2 ml-2 text-white animate-spin`}
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-10"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        ) : null}
                        {username.length > 0 && !isLoading ? (
                            <p
                                className={`self-start mb-1 ${
                                    isAvailable
                                        ? "text-green-500"
                                        : "text-red-600"
                                }`}
                            >
                                {isAvailable ? "available" : "taken"}
                            </p>
                        ) : null}
                    </div>
                    <div className="flex items-center">
                        <input
                            onChange={handleInput}
                            value={username}
                            type="text"
                            placeholder="username"
                            className="px-4 py-3 mr-2 text-2xl text-white placeholder-gray-400 outline-none"
                            style={{ backgroundColor: "#333333" }}
                        />
                        <Button100VH
                            styleType={2}
                            label="submit"
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
