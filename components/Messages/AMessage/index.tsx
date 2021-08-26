/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import ReactTimeAgo from "react-time-ago";

export default function AMessage({
    message,
    otherUserImage,
    otherUsername,
    isLast = false,
}) {
    return (
        <div
            className={`flex flex-col w-full pt-4 mt-4 mb-4 ${
                isLast ? "" : "border-t"
            } border-white border-opacity-20`}
        >
            <div className="flex items-center justify-between w-full mb-4">
                <div className="flex items-center">
                    <div
                        className={`mr-3 flex w-12 h-12 bg-gray-400 rounded-full opacity-100`}
                    >
                        <img
                            className="object-cover w-full h-full rounded-full"
                            src={otherUserImage}
                        />
                    </div>
                    <p className="text-lg font-semibold">{otherUsername}</p>
                </div>
                <p>
                    <ReactTimeAgo
                        date={new Date(message.createdAt)}
                        timeStyle="mini"
                        className="text-white opacity-70"
                    />
                </p>
            </div>
            <p>{message.message}</p>
        </div>
    );
}
