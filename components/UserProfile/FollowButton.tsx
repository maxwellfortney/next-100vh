import { useSession } from "next-auth/client";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { followUser, unfollowUser } from "../../utils/client/users";

export default function FollowButton({ isFollowingProp, otherUsername }) {
    const [session] = useSession();

    const [isLoading, setIsLoading] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isFollowing, setIsFollowing] = useState(isFollowingProp);

    async function handleToggleFollow() {
        setIsLoading(true);
        if (isFollowing) {
            const unfollowRes = await unfollowUser(
                session?.user.username as string,
                otherUsername
            );

            if (unfollowRes.isFollowing) {
                setIsFollowing(unfollowRes.isFollowing);
            } else {
                setIsFollowing(false);
            }
        } else {
            const followRes = await followUser(
                session?.user.username as string,
                otherUsername
            );

            if (followRes.isFollowing) {
                setIsFollowing(followRes.isFollowing);
            } else {
                setIsFollowing(false);
            }
        }
        setIsLoading(false);
    }

    return (
        <div
            className="flex"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <button
                onClick={handleToggleFollow}
                className={`relative group flex items-center justify-center font-extrabold group bg-gradient-to-br from-100vh-cyan to-100vh-purple px-2 py-1`}
            >
                <div
                    className="absolute transition-colors duration-300 bg-transparent group-hover:bg-100vh-gray"
                    style={{
                        width: `calc(100% - 4px)`,
                        height: `calc(100% - 4px)`,
                    }}
                />
                <CSSTransition
                    in={isLoading}
                    timeout={200}
                    classNames="fade"
                    unmountOnExit
                >
                    <svg
                        className={`absolute w-5 h-5 text-white animate-spin`}
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
                </CSSTransition>
                {isLoading ? (
                    <p className="opacity-0" style={{ zIndex: 1 }}>
                        {isFollowing ? "unfollow" : "follow"}
                    </p>
                ) : (
                    <>
                        {isFollowing ? (
                            <>
                                <p
                                    className={`absolute transition-opacity duration-300  ${
                                        isHovering ? "opacity-100" : "opacity-0"
                                    }`}
                                >
                                    unfollow
                                </p>
                                <p
                                    className={`absolute transition-opacity duration-300  ${
                                        isHovering ? "opacity-0" : "opacity-100"
                                    }`}
                                >
                                    following
                                </p>
                                {/* Psuedo Element */}
                                <p className="opacity-0">following</p>
                            </>
                        ) : (
                            <p className="z-10 opacity-100">follow</p>
                        )}
                    </>
                )}
            </button>
        </div>
    );
}
