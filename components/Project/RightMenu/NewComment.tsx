import { useState } from "react";
import Button100VH from "../../UIKit/Buttons/Button100VH";

export default function NewComment() {
    const [comment, setComment] = useState("");
    const [isValid, setIsValid] = useState(false);

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

    return (
        <div className="flex flex-col w-full">
            <div
                className="relative flex w-full mt-4"
                style={{ minHeight: "35px" }}
            >
                {/* <div className="absolute inline-block w-full h-full">
                    
                </div> */}
                <textarea
                    onChange={handleChange}
                    style={{ minHeight: "35px" }}
                    placeholder="add a comment ..."
                    className="w-full max-w-full min-w-0 pt-1 outline-none resize-y bg-100vh-gray overfl"
                />
            </div>

            <div
                className={`flex items-center transition-opacity justify-between w-full text-sm ${
                    comment.length > 0
                        ? "visible opacity-100 h-full mt-2"
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
                />
            </div>
        </div>
    );
}
