import { getCsrfToken, getProviders, signIn } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { FaGithub, FaGitlab } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import Navbar from "../../components/Navbar/Navbar";

export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context);
    const providers = await getProviders();

    return {
        props: { csrfToken, providers },
    };
}

function parseError(error) {
    if (error === "OAuthAccountNotLinked") {
        return "Email already in use by other OAuth account";
    } else if (error === "OAuthCreateAccount") {
        return "Failed to save OAuth account to database";
    } else if (error === "EmailCreateAccount") {
        return "Failed to save account to database";
    } else if (error === "EmailSignin") {
        return "Failed to send verification email";
    } else {
        return error;
    }
}

export default function SignUp({ csrfToken, providers }) {
    const router = useRouter();
    const { query } = router;
    const { error } = query;

    return (
        <div
            className="flex flex-col items-center justify-center w-full min-h-screen bg-100vh-gray"
            style={{ paddingTop: "92px" }}
        >
            <Navbar />
            <div className="flex flex-col items-center justify-center flex-1 w-full px-2 text-white">
                <div
                    className="flex flex-col items-center justify-center w-full"
                    style={{ maxWidth: "320px" }}
                >
                    {error ? (
                        <div className="flex items-center justify-center w-full py-3 text-center text-red-600">
                            <p>{parseError(error)}</p>
                        </div>
                    ) : null}

                    <ProviderButton
                        bg="#333333"
                        hoverBg="#555555"
                        provider="github"
                        lightText={true}
                    />

                    <ProviderButton
                        bg="#6b4fbb"
                        hoverBg="#8367D3"
                        provider="gitlab"
                        className="my-3"
                        lightText={true}
                    />

                    <ProviderButton
                        bg="#ffffff"
                        hoverBg="#c9c9c9"
                        provider="google"
                    />

                    <div
                        className="w-full my-5 bg-gradient-to-br from-100vh-cyan to-100vh-purple"
                        style={{ height: "2px" }}
                    />

                    {/* <button
                        className="relative flex items-center justify-center w-full px-2 py-3 text-lg font-medium text-black transition-opacity hover:opacity-80"
                        style={{ backgroundColor: "#ffffff" }}
                        onMouseEnter={(e) =>
                            ((e.target as HTMLElement).style.backgroundColor =
                                "#c9c9c9")
                        }
                        onMouseLeave={(e) =>
                            ((e.target as HTMLElement).style.backgroundColor =
                                "#ffffff")
                        }
                    >
                        <HiOutlineMail className="absolute mr-2 text-3xl left-2" />
                        <p>email</p>
                    </button> */}
                    <ProviderButton
                        bg="#ffffff"
                        hoverBg="#c9c9c9"
                        provider="email"
                        isEmail={true}
                    />
                </div>
            </div>
        </div>
    );
}

interface ProviderButton {
    bg: string;
    hoverBg: string;
    provider: string;
    className?: string;
    lightText?: boolean;
    isEmail?: boolean;
}
function ProviderButton({
    bg,
    hoverBg,
    provider,
    className,
    lightText = false,
    isEmail = false,
}: ProviderButton) {
    const [isLoading, setIsloading] = useState(false);

    function getProvderImage(provider) {
        if (provider === "github") {
            return <FaGithub className="absolute mr-2 text-3xl left-2" />;
        } else if (provider === "gitlab") {
            return <FaGitlab className="absolute mr-2 text-3xl left-2" />;
        } else if (provider === "google") {
            return <FcGoogle className="absolute mr-2 text-3xl left-2" />;
        } else if (provider === "email") {
            return <HiOutlineMail className="absolute mr-2 text-3xl left-2" />;
        }
    }

    return (
        <button
            className={`relative flex items-center justify-center w-full px-2 text-lg font-medium ${
                lightText ? "text-white" : "text-black"
            } transition-colors ${className ? className : ""}`}
            style={{ backgroundColor: bg, height: "48px" }}
            onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.backgroundColor = hoverBg)
            }
            onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.backgroundColor = bg)
            }
            onClick={() => {
                setIsloading(true);
                if (!isEmail) {
                    signIn(provider, {
                        callbackUrl:
                            process.env.NODE_ENV === "production"
                                ? process.env.PROD_URL +
                                  "/signup/new?provider=" +
                                  provider
                                : "http://localhost:3000/signup/new?provider=" +
                                  provider,
                    });
                }
            }}
        >
            {getProvderImage(provider)}
            {isLoading ? (
                // <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" />
                <svg
                    className={`w-6 h-6 ${
                        lightText ? "text-white" : "text-black"
                    } animate-spin`}
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-10"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            ) : (
                <p>{provider}</p>
            )}
        </button>
    );
}
