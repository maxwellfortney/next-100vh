import { useEffect } from "react";
import { useState } from "react";
import AComment from "./AComment";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

export default function Comments({ project }) {
    const [comments, setComments] = useState<Array<any>>([]);

    async function fetchComments() {
        const res = await fetch(
            `/api/users/${project.ownerUsername}/projects/${project.title}/comments`
        );

        if (res.status === 200) {
            const comments = await res.json();

            console.log(comments);

            if (comments) {
                setComments(comments);
            }
        } else {
        }
    }

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <div className="flex flex-col w-full">
            {comments.map((comment) => {
                return <AComment key={comment._id} comment={comment} />;
            })}
        </div>
    );
}
