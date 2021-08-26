import { useState } from "react";
import { useEffect } from "react";
import AMessage from "../AMessage";

import en from "javascript-time-ago/locale/en";
import TimeAgo from "javascript-time-ago";
import { session, useSession } from "next-auth/client";
import Link from "next/link";

TimeAgo.addDefaultLocale(en);

export default function AChatView({ otherUsername, otherUserImage }) {
    const [session] = useSession();

    const [loadingMessages, setLoadingMessages] = useState(true);
    const [messages, setMessages] = useState<Array<any>>([]);

    const [messageInputString, setMessageInputString] = useState("");
    const [loadingSend, setLoadingSend] = useState(false);

    async function fetchMessages() {
        setLoadingMessages(true);
        const res = await fetch(`/api/user/chats/${otherUsername}/messages`);

        if (res.status === 200) {
            const messagesRes = await res.json();
            console.log(messagesRes);
            setMessages(messagesRes);
        }
        setLoadingMessages(false);
    }

    function handleInputChange(e) {
        setMessageInputString(e.target.value);
    }

    async function handleSendMessage() {
        setLoadingSend(true);
        const res = await fetch(`/api/user/chats/${otherUsername}/messages`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: messageInputString,
            }),
        });

        if (res.status === 204) {
            messages.unshift({
                from: session?.user.username,
                to: otherUsername,
                message: messageInputString,
                createdAt: Date.now(),
            });

            setMessages(messages);
            setMessageInputString("");
            setLoadingSend(false);
        }
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <>
            <div className="flex flex-col items-center flex-1 w-11/12 mt-4">
                <Link href={`/messages`}>
                    <a className="self-start mb-5 text-4xl font-semibold">{`< back`}</a>
                </Link>
                <div className="relative flex flex-col items-center flex-1 w-11/12 h-full">
                    <div className="absolute top-0 z-10 w-full h-1/5 bg-gradient-to-b from-100vh-gray to-transparent"></div>
                    <div className="absolute top-0 left-0 flex flex-col-reverse items-center w-full h-full pr-1 overflow-y-auto">
                        {messages.map((message, i) => {
                            return (
                                <AMessage
                                    key={message + i}
                                    message={message}
                                    otherUserImage={otherUserImage}
                                    otherUsername={otherUsername}
                                    isLast={i === messages.length - 1}
                                />
                            );
                        })}
                    </div>

                    {loadingMessages && <div className="flex">loading</div>}
                </div>
            </div>
            <div className="flex items-center justify-center w-11/12 mt-5">
                <div className="flex justify-between w-11/12 pb-5 mb-4 border-t pt-7 border-opacity-20">
                    <input
                        onChange={handleInputChange}
                        value={messageInputString}
                        className="w-full px-2 mr-2 outline-none bg-100vh-gray"
                        placeholder="type a message"
                    />
                    <button
                        disabled={messageInputString.length <= 0}
                        onClick={handleSendMessage}
                        className={`relative flex items-center justify-center font-extrabold group bg-gradient-to-br from-100vh-cyan to-100vh-purple px-3 py-2 transition-opacity ${
                            messageInputString.length > 0 ? "" : "opacity-60"
                        }`}
                    >
                        <div
                            className="absolute transition-colors duration-300 bg-transparent group-hover:bg-100vh-gray"
                            style={{
                                width: `calc(100% - ${4 * 2}px)`,
                                height: `calc(100% - ${4 * 2}px)`,
                            }}
                        />

                        <p style={{ zIndex: 1 }}>
                            {loadingSend ? (
                                <svg
                                    className={`w-5 h-5 my-0.5 text-white animate-spin`}
                                    style={{ width: "39px" }}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-10"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                    ></circle>
                                    <path
                                        className="opacity-90"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            ) : (
                                "send"
                            )}
                        </p>
                    </button>
                </div>
            </div>
        </>
    );
}
