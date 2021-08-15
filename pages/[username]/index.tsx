/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { session, signIn, signOut, useSession } from "next-auth/client";
import Head from "next/head";

import Navbar from "../../components/Navbar/Navbar";
import ProfilePage from "../../components/UserProfile/ProfilePage/ProfilePage";

export async function getServerSideProps(context) {
    const { username } = context.params;
    console.log("params", context.params);
    console.log("typeof ", typeof username);
    console.log("username ", username);

    const res = await fetch(
        `${
            process.env.NODE_ENV === "production"
                ? process.env.PROD_URL
                : "http://localhost:3000"
        }/api/users/getByUsername/${username}`
    );

    if (res.status === 200) {
        const user = await res.json();

        // let menuViewProp = "projects";
        // if (username.length > 1) {
        //     if (
        //         username[1] == "projects" ||
        //         username[1] == "likedProjects" ||
        //         username[1] == "about"
        //     ) {
        //         menuViewProp = username[1];
        //     }
        // }

        return {
            props: {
                username: user.username,
                name: user.name,
                image: user.image,
                followers: user.followers.length,
                following: user.following.length,
                projectLikes: user.projectLikes,
                bio: user.bio,
                isVerified: user.isVerified,
                createdAt: user.createdAt,
                // menuViewProp,
            },
        };
    } else {
        return {
            redirect: {
                destination: "/404",
                permanent: false,
            },
        };
    }
}

export default function UserPage({
    username,
    name,
    image,
    followers,
    following,
    projectLikes,
    bio,
    isVerified,
    createdAt,
    menuViewProp,
}) {
    const router = useRouter();
    const [menuView, setMenuView] = useState("projects");

    const [projects, setProjects] = useState<Array<any>>([]);
    const [didFetchUser, setDidFetchUser] = useState(false);

    async function getProjects() {
        const res = await fetch("/api/projects/getProjects/" + username);

        const projects = await res.json();
        console.log(projects);

        if (res.status === 200 && projects) {
            setProjects(projects);
        }
    }

    useEffect(() => {
        if (username) {
            if (!didFetchUser) {
                setDidFetchUser(true);
                getProjects();
            } else {
                router.reload();
            }
        }
    }, [username]);

    useEffect(() => {
        if (menuViewProp) {
            setMenuView(menuViewProp);
        }
    }, [menuViewProp]);

    return (
        <div
            className="flex flex-col items-center justify-center w-full min-h-screen bg-100vh-gray"
            style={{ paddingTop: "92px" }}
        >
            <Head>
                <title>{username} | 100vh</title>
            </Head>
            <Navbar />

            <ProfilePage
                username={username}
                name={name}
                image={image}
                followers={followers}
                following={following}
                projectLikes={projectLikes}
                projects={projects}
                bio={bio}
                isVerified={isVerified}
                createdAt={createdAt}
                menuView={menuView}
                setMenuView={setMenuView}
            />

            {/* {session ? (
        <></>
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
      )} */}
        </div>
    );
}
