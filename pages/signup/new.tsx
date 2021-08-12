import { getSession, signIn, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";

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

    useEffect(() => {
        router.push("/signup/new", undefined, { shallow: true });
    }, []);

    const [username, setUsername] = useState("");

    const [isAvailable, setIsAvailable] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [invalidMessage, setInvalidMessage] = useState<null | string>(null);

    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const [isWaitingSubmit, setIsWaitingSubmit] = useState(false);

    async function handleInput(e) {
        if (timer !== null) {
            clearTimeout(timer);
            setTimer(null);
        }

        setUsername(e.target.value);
        await validateUsername(e.target.value);
    }

    async function checkAvailablity(username) {
        const res = await fetch("/api/validateUsername/" + username);
        const { isAvailable } = await res.json();
        setIsAvailable(isAvailable);

        console.log("isAvailable ", isAvailable);
        clearTimeout(timer as NodeJS.Timeout);
        return isAvailable;
    }

    const usernameRegex = new RegExp("^[A-Za-z0-9][A-Za-z0-9_\\-\\.]{0,32}$");

    async function checkIsValid(username) {
        setInvalidMessage(null);
        setIsValid(usernameRegex.test(username));
        console.log("isValid ", usernameRegex.test(username));

        if (!usernameRegex.test(username)) {
            setInvalidMessage("invalid characters");
        }
        if (username[0] === ".") {
            setInvalidMessage(`can't start with "."`);
        }
        if (username[0] === "-") {
            setInvalidMessage(`can't start with "-"`);
        }
        if (username[0] === "_") {
            setInvalidMessage(`can't start with "_"`);
        }
        if (username.indexOf(" ") !== -1) {
            setInvalidMessage("spaces not allowed");
        }
        if (username.length > 20) {
            setInvalidMessage("too long");
        }

        return usernameRegex.test(username);
    }

    async function validateUsername(username) {
        const valid = await checkIsValid(username);

        if (valid) {
            setTimer(
                setTimeout(async () => {
                    await checkAvailablity(username);
                    setTimer(null);
                }, 500)
            );
        } else {
            setTimer(null);
        }
    }

    async function handleSubmit() {
        setIsWaitingSubmit(true);
        const res = await fetch("/api/user/setUsername/" + username);

        if (res.status === 200) {
            window.location.href =
                process.env.NODE_ENV === "production"
                    ? (process.env.PROD_URL as string)
                    : "http://localhost:3000";
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-100vh-gray">
            <div className="flex mt-8" style={{ width: "95%" }}>
                <Link href="/">
                    <a className="text-5xl font-black text-transparent transition-opacity duration-300 md:text-6xl hover:opacity-40 bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                        100vh
                    </a>
                </Link>
            </div>
            <div className="flex flex-col items-center justify-start flex-1 w-11/12 px-2 text-white">
                <h1 className="self-start w-11/12 mt-20 text-6xl font-extrabold md:w-3/4 xl:w-1/2 lg:text-7xl">
                    thank you for signing up for 100vh.
                </h1>
                <h2 className="self-start w-11/12 mt-5 text-6xl font-semibold">
                    please enter your username
                </h2>
                <div className="flex flex-col items-center justify-center flex-1 my-3">
                    <div
                        className="flex items-center self-start"
                        style={{ minHeight: "28px" }}
                    >
                        {username.length > 0 ? (
                            <SwitchTransition mode="out-in">
                                <CSSTransition
                                    key={(timer === null) as any}
                                    addEndListener={(node, done) => {
                                        node.addEventListener(
                                            "transitionend",
                                            done,
                                            false
                                        );
                                    }}
                                    classNames="fade-fast"
                                >
                                    {timer === null ? (
                                        <>
                                            {isValid ? (
                                                <p
                                                    className={`self-start mb-1 ${
                                                        isAvailable
                                                            ? "text-green-500"
                                                            : "text-red-600"
                                                    }`}
                                                >
                                                    {isAvailable
                                                        ? "available"
                                                        : "taken"}
                                                </p>
                                            ) : (
                                                <>
                                                    <p
                                                        className={`self-start mb-1 text-red-600`}
                                                    >
                                                        {invalidMessage
                                                            ? invalidMessage
                                                            : "invalid"}
                                                    </p>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {timer ? (
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
                                        </>
                                    )}
                                </CSSTransition>
                            </SwitchTransition>
                        ) : null}
                    </div>
                    <div className="relative flex items-center">
                        <input
                            onChange={handleInput}
                            value={username}
                            type="text"
                            placeholder="username"
                            className="px-4 py-3 text-2xl text-white placeholder-gray-400 outline-none"
                            style={{
                                backgroundColor: "#333333",
                            }}
                            pattern="[A-Za-z]{3}"
                        />
                        <button
                            disabled={
                                !isAvailable || timer !== null || !isValid
                            }
                            onClick={handleSubmit}
                            className={`absolute duration-300 left-full ml-2 flex font-extrabold transition-opacity cursor-pointer justify-center items-center group bg-gradient-to-br from-100vh-cyan to-100vh-purple ${
                                !isAvailable || timer !== null || !isValid
                                    ? "opacity-0"
                                    : "opacity-100"
                            }`}
                        >
                            <div
                                className={`flex justify-center w-full px-5 py-3 m-1 transition-colors duration-300 bg-100vh-gray hover:bg-transparent ${
                                    isWaitingSubmit
                                        ? "text-transparent bg-transparent"
                                        : ""
                                }`}
                            >
                                submit
                            </div>

                            <svg
                                className={`w-5 h-5 text-white animate-spin absolute transition-opacity duration-300 ${
                                    isWaitingSubmit
                                        ? "opacity-100"
                                        : "opacity-0"
                                }`}
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
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
