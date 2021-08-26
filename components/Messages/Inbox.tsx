/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/client";
import { useState } from "react";
import { useEffect } from "react";
import { fetchUserAvatar } from "../../utils/client/users";
import AChat from "./AChat";

export default function Inbox() {
    const [isLoading, setIsLoading] = useState(true);
    const [chats, setChats] = useState<Array<any>>([]);

    async function fetchChats() {
        setIsLoading(true);
        const res = await fetch(`/api/user/chats`);

        if (res.status === 200) {
            const chatsRes = await res.json();
            console.log(chatsRes);
            setChats(chatsRes);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchChats();
    }, []);

    return (
        <div className="flex flex-col items-center w-full mt-4 lg:w-11/12">
            <div className="flex flex-col items-center w-full">
                {isLoading ? null : (
                    <>
                        {chats.length > 0 ? (
                            <>
                                {chats.map((chat) => {
                                    return (
                                        <AChat key={chat.users} chat={chat} />
                                    );
                                })}
                            </>
                        ) : (
                            <div className="flex">create new chat</div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
