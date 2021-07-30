import { FaGithub, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/client";

export default function SignUp({ blurBg, setBlurBg, isSignIn, isSignUp }: any) {
    return (
        <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen">
            <div
                onClick={() => setBlurBg(false)}
                className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
            ></div>
            <div className="z-30 flex flex-col items-center justify-center w-3/4 p-5 text-white lg:w-1/2 bg-100vh-gray">
                <p className="self-start text-3xl font-extrabold">
                    {isSignUp && !isSignIn ? "sign up" : "sign in"}
                </p>
                <div className="flex flex-col w-3/4">
                    <div className="flex">
                        <input
                            type="text"
                            className="flex-1 px-2 py-2 mr-4"
                            placeholder="first name"
                        />
                        <input
                            type="text"
                            className="flex-1 px-2 py-2"
                            placeholder="last name"
                        />{" "}
                    </div>
                    <input
                        type="text"
                        className="flex-1 px-2 py-2 my-4"
                        placeholder="email"
                    />
                    <input
                        type="password"
                        className="flex-1 px-2 py-2"
                        placeholder="password"
                    />
                    <p className="self-center my-8 text-2xl font-bold">or</p>
                    <button
                        className="flex items-center p-2 text-2xl transition-opacity hover:opacity-80"
                        onClick={() => signIn("github")}
                        style={{ backgroundColor: "#333333" }}
                    >
                        <FaGithub className="mr-2 text-3xl" />
                        <p>Github</p>
                    </button>
                    <button
                        className="flex items-center p-2 my-3 text-2xl text-black transition-opacity hover:opacity-80"
                        onClick={() => signIn("google")}
                        style={{ backgroundColor: "#ffffff" }}
                    >
                        <FcGoogle className="mr-2 text-3xl" />
                        <p>Google</p>
                    </button>
                    <button
                        className="flex items-center p-2 text-2xl transition-opacity hover:opacity-80"
                        onClick={() => signIn("facebook")}
                        style={{ backgroundColor: "#1877f2" }}
                    >
                        <FaFacebook className="mr-2 text-3xl" />
                        <p>Facebook</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
