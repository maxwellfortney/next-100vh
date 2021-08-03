/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";

export default function ProfileImage({ image }) {
  const [didFetch, setDidFetch] = useState(false);

  useEffect(() => {
    const img = document.querySelector("#ProfilePhoto") as HTMLImageElement;
    img.src = image;
    img.onload = () => {
      setDidFetch(true);
    };
  }, []);

  return (
    <div
      className="flex items-center justify-center w-40 h-40 overflow-hidden rounded-full lg:w-48 lg:h-48"
      style={{ backgroundColor: "#282828" }}
    >
      <img id="ProfilePhoto" />
      {!didFetch ? (
        <svg
          className={`w-6 h-6 animate-spin`}
          style={{ color: "333333" }}
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-10"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : null}
    </div>
  );
}
