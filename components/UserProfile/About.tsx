import { useSession } from "next-auth/client";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

export default function About({ bio, createdAt }) {
    return (
        <div className="flex flex-col items-center justify-start w-full text-white">
            {createdAt ? (
                <>
                    {bio && (
                        <div className="flex flex-col w-full animate-fadeIn">
                            <h2 className="mt-3 mb-2 text-lg font-bold">bio</h2>
                            <p>{bio}</p>
                        </div>
                    )}

                    <p className="mt-20 text-sm opacity-70">
                        member since{" "}
                        <ReactTimeAgo
                            date={new Date(createdAt)}
                            timeStyle="twitter"
                        />
                    </p>
                </>
            ) : (
                <svg
                    className={`w-6 h-6 animate-spin mx-auto mt-24`}
                    style={{ color: "282828" }}
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
            )}
        </div>
    );
}
