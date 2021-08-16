import { useSession } from "next-auth/client";
import { createRef } from "react";
import { useState } from "react";
import Button100VH from "../../UIKit/Buttons/Button100VH";

export default function NewComment({ projectTitle, projectOwnerUsername }) {
    const [comment, setComment] = useState("");
    const [isValid, setIsValid] = useState(false);

    const [session, loading] = useSession();

    function handleChange(e) {
        setComment(e.target.value);

        validateComment(e.target.value);
    }

    function validateComment(text) {
        setIsValid(true);

        if (text.length > 250) {
            setIsValid(false);
        }
    }

    async function submitNewComment() {
        const res = await fetch(
            `/api/users/${projectOwnerUsername}/projects/${projectTitle}/comments`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    comment: comment,
                }),
            }
        );

        console.log(await res.text());
        console.log(res.status);

        if (res.status === 204) {
            setComment("");
        } else {
            // failed
        }
    }

    return (
        <div className="flex flex-col w-full mt-4">
            <textarea
                onChange={handleChange}
                value={comment}
                placeholder="add a comment ..."
                style={{
                    minHeight: comment.length > 0 ? "75px" : "35px",
                    maxHeight: comment.length > 0 ? "" : "35px",
                }}
                className="w-full h-full max-w-full min-w-0 pt-1 outline-none resize-y bg-100vh-gray overfl"
            />

            <div
                className={`flex items-center transition-opacity justify-between w-full text-sm ${
                    comment.length > 0
                        ? "visible opacity-100 mt-2"
                        : "invisible opacity-0 h-0"
                }`}
            >
                <div className="flex items-center self-end">
                    <p className={`${!isValid ? "text-red-600" : ""}`}>
                        {comment.length}
                    </p>
                    <p>/250</p>
                </div>
                <Button100VH
                    styleType={3}
                    label="submit"
                    className={`px-2 py-1 transition-opacity ${
                        !isValid ? "opacity-60" : "opacity-100"
                    }`}
                    borderWidth={2}
                    disabled={!isValid}
                    onClick={submitNewComment}
                />
            </div>
        </div>
    );
}
