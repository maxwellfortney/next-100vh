import { abbreviateNumber } from "js-abbreviation-number";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import Button100VH from "../../UIKit/Buttons/Button100VH";
import About from "../About";
import LikedProjects from "../LikedProjects";
import ProfileImage from "../ProfileImage";
import Projects from "../Projects";

export default function ProfilePage({
  username,
  name,
  image,
  followers,
  following,
  projectLikes,
  projects,
  bio,
  createdAt,
  menuView,
  setMenuView,
}) {
  const router = useRouter();

  const [session, loading] = useSession();
  const [isPrivate, setIsPrivate] = useState(false);

  const [didFetchDoesFollow, setDidFetchDoesFollow] = useState(false);
  const [doesFollow, setDoesFollow] = useState(false);

  const [followersOffset, setFollowersOffset] = useState(0);

  async function fetchDoesFollow() {
    if (!didFetchDoesFollow) {
      const res = await fetch(
        `/api/users/doesUserFollowUser/${
          (session?.user as any).username
        }?toUsername=${username}`
      );

      if (res.status === 200) {
        const doesFollowJson = await res.json();

        setDoesFollow(doesFollowJson.doesFollow);
        setDidFetchDoesFollow(true);
      } else {
        console.log(res.status);
      }
    }
  }

  useEffect(() => {
    if (session) {
      if ((session.user as any).username === username) {
        setIsPrivate(true);
      }
      fetchDoesFollow();
    }
  }, [session]);

  function FollowButton() {
    const [isHovering, setIsHovering] = useState(false);
    const [isLoadingAction, setIsLoadingAction] = useState(false);

    async function handleFollowButtonClick() {
      console.log(doesFollow);

      if (session) {
        if (didFetchDoesFollow) {
          if (doesFollow) {
            setIsLoadingAction(true);
            const res = await fetch("/api/user/unfollow/" + username);

            console.log(await res.text());
            if (res.status === 200) {
              setDoesFollow(false);
              setFollowersOffset(followersOffset - 1);
            }
            setIsLoadingAction(false);
          } else {
            setIsLoadingAction(true);
            const res = await fetch("/api/user/follow/" + username);

            console.log(await res.text());
            if (res.status === 200) {
              setDoesFollow(true);
              setFollowersOffset(followersOffset + 1);
            }
            setIsLoadingAction(false);
          }
        }
      }
    }

    return (
      <button
        onClick={handleFollowButtonClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`group flex mr-2 font-extrabold cursor-pointer group bg-gradient-to-br from-100vh-cyan to-100vh-purple`}
      >
        <div className="flex items-center justify-center w-full px-5 py-3 m-1 transition-all duration-300 bg-100vh-gray hover:bg-transparent">
          {isLoadingAction ? (
            <svg
              className={`w-5 h-5 text-white animate-spin my-1 mx-5`}
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
            <>
              {doesFollow ? (
                <>
                  <p className="absolute transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                    unfollow
                  </p>
                  <p className="absolute transition-opacity duration-200 opacity-100 group-hover:opacity-0">
                    following
                  </p>
                  {/* Psuedo Element */}
                  <p className="opacity-0">following</p>
                </>
              ) : (
                "follow"
              )}
            </>
          )}
        </div>
      </button>
    );
  }

  function FollowersCounter() {
    return (
      <a className="flex items-center pb-1 mt-1 text-xl transition-colors duration-300 border-b-2 border-transparent cursor-pointer hover:border-white">
        <p className="font-bold">
          {abbreviateNumber(followers + followersOffset, 1, {
            symbols: ["", "k", "m", "g", "t", "p", "e"],
          })}
        </p>
        <p className="ml-1">
          follower{followers + followersOffset === 1 ? "" : "s"}
        </p>
      </a>
    );
  }

  function FollowingCounter() {
    return (
      <a className="flex items-center pb-1 mt-1 ml-2 text-xl transition-colors duration-300 border-b-2 border-transparent cursor-pointer hover:border-white">
        <p className="font-bold">
          {abbreviateNumber(following, 1, {
            symbols: ["", "k", "m", "g", "t", "p", "e"],
          })}
        </p>
        <p className="ml-1">following</p>
      </a>
    );
  }

  function UserName() {
    return (
      <div className={`flex items-center`}>
        <h1 className="mt-2 text-6xl font-extrabold">{name}</h1>
        {/* 
        {isPrivate && (
          <svg
            className="self-end w-5 h-5 mb-1 ml-2 md:w-4 md:h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        )} */}
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 w-11/12">
      <div className="relative flex justify-between w-full">
        {isPrivate && (
          <Link href="/settings">
            <a
              style={{ transitionDuration: "400ms" }}
              className="absolute text-white transition-all transform rotate-0 hover:opacity-70 w-7 h-7 top-10 right-2 hover:rotate-90"
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </a>
          </Link>
        )}
        <div className="flex flex-col self-start mt-16 text-white animate-fadeIn">
          <ProfileImage image={image} />
          {/* {isPrivate ? <p>isPrivate</p> : null} */}
          <UserName />
          <div className="flex">
            <FollowersCounter />
            <FollowingCounter />
          </div>
        </div>
        <div className="flex flex-col items-center self-end justify-between flex-none text-white">
          <a
            onClick={() =>
              signOut({
                callbackUrl: "http://localhost:3000/",
              })
            }
            className="flex mb-10"
          >
            logout
          </a>
          <div className="flex text-xl font-extrabold ">
            {session ? (
              <>
                <FollowButton />
                <Button100VH styleType={3} label="message" className="px-4" />
              </>
            ) : (
              <Button100VH
                styleType={2}
                label="sign up to message"
                isLink={true}
                href="/signup"
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full mt-10 mb-3">
        <div className="flex items-center text-xl font-bold text-white">
          <a
            onClick={() => {
              router.push(
                {
                  pathname: `${username}`,
                },
                undefined,
                { shallow: true }
              );
              setMenuView("projects");
            }}
            className="flex items-center transition-opacity duration-300 cursor-pointer hover:opacity-50"
          >
            <p className="mr-2">projects</p>
            <p className="text-transparent mr-7 bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple">
              {projects.length}
            </p>
          </a>

          {projectLikes && projectLikes.length > 0 && (
            <a
              onClick={() => {
                router.push(
                  {
                    pathname: `${username}/likedProjects`,
                  },
                  undefined,
                  { shallow: true }
                );
                setMenuView("likedProjects");
              }}
              className="flex items-center transition-opacity duration-300 cursor-pointer hover:opacity-50"
            >
              <p className="mr-2">liked projects</p>
              <p className="text-transparent mr-7 bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                {projectLikes.length}
              </p>
            </a>
          )}

          <a
            onClick={() => {
              router.push(
                {
                  pathname: `${username}/about`,
                },
                undefined,
                { shallow: true }
              );
              setMenuView("about");
            }}
            className="flex items-center transition-opacity duration-300 cursor-pointer hover:opacity-50"
          >
            <p>about</p>
          </a>
        </div>
      </div>
      <div className="w-full mb-6 bg-white" style={{ height: "2px" }} />
      {menuView === "projects" && <Projects />}
      {menuView === "likedProjects" && <LikedProjects />}
      {menuView === "about" && <About bio={bio} createdAt={createdAt} />}
    </div>
  );
}
