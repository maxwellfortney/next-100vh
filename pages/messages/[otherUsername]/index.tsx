import { getSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect } from "react";
import { useState } from "react";
import AChatView from "../../../components/Messages/AChatView";
import Navbar from "../../../components/Navbar/Navbar";
import Button100VH from "../../../components/UIKit/Buttons/Button100VH";
import { fetchUserAvatar } from "../../../utils/client/users";

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const { otherUsername } = context.query;

    if (!session) {
        return {
            redirect: {
                destination: "/401",
                permanent: false,
            },
        };
    } else {
        const res = await fetch(
            process.env.NODE_ENV === "production"
                ? (process.env.PROD_URL as string)
                : "http://localhost:3000" + `/api/user/chats/${otherUsername}`
        );

        if (res.status === 404) {
            return {
                props: {
                    chatNotFound: true,
                },
            };
        } else {
            return {
                props: {
                    chatNotFound: false,
                },
            };
        }
    }
}

export default function MessagesWithUser({ chatNotFound }) {
    const router = useRouter();
    const { otherUsername } = router.query;

    const [loadingImage, setLoadingImage] = useState(true);
    const [otherUserImage, setOtherUserImage] = useState("");

    async function fetchOtherUserAvatar() {
        setLoadingImage(true);
        const userImageRes = await fetchUserAvatar(otherUsername as string);

        if (userImageRes) {
            setOtherUserImage(userImageRes);
        }
        setLoadingImage(false);
    }

    useEffect(() => {
        fetchOtherUserAvatar();
    }, []);

    return (
        <div
            className="flex flex-col items-center justify-center w-full min-h-screen bg-100vh-gray"
            style={{ paddingTop: "92px" }}
        >
            <Head>
                <title>messages | 100vh</title>
            </Head>
            <Navbar />

            <div className="flex flex-col items-center justify-between flex-1 w-11/12 h-full mt-8 text-white">
                {/* <MenuBar />
                <Inbox /> */}
                <AChatView
                    otherUsername={otherUsername}
                    otherUserImage={otherUserImage}
                />
            </div>
        </div>
    );
}
