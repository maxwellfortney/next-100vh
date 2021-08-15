import Link from "next/link";

export default function TopMenu({ showMenus, setShowMenus, project }) {
    return (
        <div
            className={`flex transition-all ${
                showMenus ? "mb-3 mt-8" : "mb-0 mt-0"
            } items-center justify-between duration-300 text-base`}
            style={{ height: showMenus ? "60px" : "0px", width: "95%" }}
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
                <h1 className="text-5xl font-bold lg:text-6xl">
                    {project.title}
                </h1>
                <div className="flex items-center self-end pb-1 ml-3">
                    <p className="mr-1 ">by</p>
                    <h2>{project.ownerUsername}</h2>
                </div>
            </div>
            <div className="flex">
                <svg
                    onClick={() => setShowMenus(false)}
                    className="transition-opacity cursor-pointer w-9 hover:opacity-60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </div>
        </div>
    );
}
