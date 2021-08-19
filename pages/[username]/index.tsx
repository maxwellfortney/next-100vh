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
        }/api/users/${username}`
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
                likedProjects: user.likedProjects,
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
    likedProjects,
    bio,
    isVerified,
    createdAt,
    // menuViewProp,
}) {
    const router = useRouter();
    const [menuView, setMenuView] = useState("projects");

    const [projects, setProjects] = useState<Array<any>>([]);
    const [didFetchUser, setDidFetchUser] = useState(false);

    async function getProjects() {
        const res = await fetch("/api/users/" + username + "/projects");

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

    // useEffect(() => {
    //     if (menuViewProp) {
    //         setMenuView(menuViewProp);
    //     }
    // }, [menuViewProp]);

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
                likedProjects={likedProjects}
                projects={projects}
                bio={bio}
                isVerified={isVerified}
                createdAt={createdAt}
                menuView={menuView}
                setMenuView={setMenuView}
            />
        </div>
    );
}
