import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en";

import Button100VH from "../../UIKit/Buttons/Button100VH";

TimeAgo.addDefaultLocale(en);
export default function ARepo({ name, isPrivate, updatedAt }) {
    return (
        <div
            // onClick={handleClick}
            className="flex items-center justify-start w-full"
            style={{ height: "65px", minHeight: "65px" }}
        >
            <div className="flex items-center justify-between w-full px-4">
                {/* <img src={} alt={name} className="w-6 h-6 mx-2" /> */}
                <div className="flex items-center">
                    <p className="text-base">{name}</p>
                    {isPrivate ? (
                        <svg
                            className="w-5 h-5 ml-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    ) : null}
                    <p className="mx-1">·</p>
                    <ReactTimeAgo
                        date={new Date(updatedAt)}
                        timeStyle="mini"
                        className="text-sm"
                    />
                    <p className="ml-1 text-sm">ago</p>
                </div>
                <div className="flex">
                    <Button100VH
                        styleType={3}
                        label="import"
                        className="h-10 px-3 text-sm"
                        borderWidth={2}
                    />
                </div>
            </div>
        </div>
    );
}
