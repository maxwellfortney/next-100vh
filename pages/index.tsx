import Navbar from "../components/Navbar/Navbar";
import AnimatedText from "../components/Home/AnimatedTexts";

export default function Home() {
    return (
        <div className="relative flex flex-col items-center justify-center w-full h-screen min-h-screen bg-100vh-gray">
            <AnimatedText />
            <Navbar />
            <div className="z-10 flex flex-col items-center justify-center flex-1 w-full h-full text-white">
                <h1 className="w-3/4 mb-20 font-black text-center lg:w-1/2 text-7xl">
                    The leading immersive design platform for developers and
                    artists.
                </h1>
                <div className="flex">
                    <div className="flex flex-1 mr-4 text-2xl font-extrabold cursor-pointer group bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                        <div className="flex justify-center w-full px-5 py-3 m-1 transition-colors duration-300 bg-100vh-gray hover:bg-transparent">
                            upload
                        </div>
                    </div>
                    <div className="flex flex-1 text-2xl font-extrabold cursor-pointer bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                        <div className="flex justify-center w-full px-5 py-3 m-1 transition-colors duration-300 bg-100vh-gray hover:bg-transparent">
                            browse
                        </div>
                    </div>
                </div>
            </div>
            <svg
                className="w-16 h-16 mb-2 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
            >
                <defs>
                    <linearGradient
                        id="linear"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                    >
                        <stop
                            offset="0%"
                            stopColor="#00FFFF"
                            stopOpacity="1.0"
                        />
                        <stop
                            offset="100%"
                            stopColor="#8000FF"
                            stopOpacity="1.0"
                        />
                    </linearGradient>
                </defs>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    stroke="url(#linear)"
                    d="M17 13l-5 5m0 0l-5-5m5 5V6"
                />
            </svg>
        </div>
    );
}
