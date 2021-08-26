/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { useState } from "react";
import { fetchUserAvatar } from "../../utils/client/users";
import en from "javascript-time-ago/locale/en";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import Link from "next/link";

TimeAgo.addDefaultLocale(en);

export default function AChat({ chat }) {
    const [session] = useSession();

    const otherUser =
        chat.users[0] == session?.user.username ? chat.users[1] : chat.users[0];

    const [loadingImage, setLoadingImage] = useState(true);
    const [otherUserImage, setOtherUserImage] = useState("");

    async function fetchOtherUserAvatar() {
        setLoadingImage(true);
        const userImageRes = await fetchUserAvatar(otherUser);

        if (userImageRes) {
            setOtherUserImage(userImageRes);
        }

        setLoadingImage(false);
    }

    useEffect(() => {
        fetchOtherUserAvatar();
    }, []);

    return (
        <Link href={`/messages/${otherUser}`}>
            <a className="flex items-center justify-between w-full mb-4">
                <div className="flex items-center">
                    <div
                        className={`mr-3 flex w-14 h-14 bg-gray-400 rounded-full ${
                            loadingImage ? "opacity-20" : "opacity-100"
                        }`}
                    >
                        {loadingImage && otherUserImage.length > 0 ? null : (
                            <img
                                className="object-cover w-full h-full rounded-full"
                                src={otherUserImage}
                            />
                        )}
                    </div>
                    <p className="text-lg font-semibold">{otherUser}</p>
                </div>
                <div className="flex items-center justify-center w-full">
                    <p>{chat.messages[chat.messages.length - 1].message}</p>
                </div>
                <p>
                    <ReactTimeAgo
                        date={
                            new Date(
                                chat.messages[
                                    chat.messages.length - 1
                                ].createdAt
                            )
                        }
                        timeStyle="mini"
                        className="text-white opacity-70"
                    />
                </p>
            </a>
        </Link>
    );
}
