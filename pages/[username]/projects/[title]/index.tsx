/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { session, signIn, signOut, useSession } from "next-auth/client";
import Head from "next/head";

export async function getServerSideProps(context) {
    const { title } = context.params;
    console.log("1 ", context.params);
    console.log("2 ", typeof title);
    console.log("3 ", title);

    // if (res.status === 404) {
    //     return {
    //         redirect: {
    //             destination: "/404",
    //             permanent: false,
    //         },
    //     };
    // } else if (res.status === 200) {
    //     const user = await res.json();

    //     let menuViewProp = "projects";
    //     if (username.length > 1) {
    //         if (
    //             username[1] == "projects" ||
    //             username[1] == "likedProjects" ||
    //             username[1] == "about"
    //         ) {
    //             menuViewProp = username[1];
    //         }
    //     }
    // }
    return {
        props: {},
    };
}

export default function UserPage() {
    return <div className="flex">user</div>;
}
