/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { signOut } from "next-auth/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Text100VH from "../UIKit/Text/Text100VH";

export default function DropdownToggle({ session }) {
  const [isHovering, setIsHovering] = useState(false);

  function growDiv() {
    var growDiv = document.querySelector("#grow") as HTMLElement;
    if (growDiv.clientHeight) {
      growDiv.style.height = "0";
    } else {
      var wrapper = document.querySelector("#measuringWrapper") as HTMLElement;
      growDiv.style.height = wrapper.clientHeight + "px";
    }
  }

  // useEffect(() => {
  //     growDiv();
  // }, []);

  return (
    <div
      onMouseEnter={() => {
        growDiv();
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        growDiv();
        setIsHovering(false);
      }}
      className={`relative flex flex-col font-extrabold cursor-pointer bg-gradient-to-br from-100vh-cyan to-100vh-purple mr-1`}
      style={{ minWidth: "125px" }}
    >
      <div
        className={`absolute w-full h-full flex transition-all duration-200 bg-100vh-gray ${
          isHovering ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        className={`flex justify-start items-end flex-col bg-100vh-gray m-1`}
        style={{ zIndex: 1 }}
      >
        <a
          href={(session?.user as any)?.username}
          className="flex items-center py-3 pl-4 pr-3"
        >
          <p className="">{(session?.user as any)?.username}</p>
          {/* <img
                            className="rounded-full w-11 h-11"
                            src={
                                session?.user.image ? session?.user.image : null
                            }
                        /> */}
        </a>
        <div
          id="grow"
          className="w-full bg-100vh-gray"
          style={{
            transition: "height .25s",
            height: 0,
            overflow: "hidden",
            // outline: "1px solid red",
          }}
        >
          <div
            id="measuringWrapper"
            className="flex flex-col items-end mr-3 text-base text-white"
          >
            <div
              className="flex w-full mb-2 transition-all bg-gradient-to-br to-100vh-cyan from-100vh-purple"
              style={{
                height: "3px",
                width: isHovering ? "calc(100% - 16px)" : "0px",
              }}
            />
            {/* <div className="relative flex">
                                <div className={`relative flex group`}>
                                    <p className="absolute text-transparent transition-opacity duration-300 group-hover:opacity-0 bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                                        {"profile"}
                                    </p>
                                    <p className="transition-opacity opacity-0 group-hover:opacity-100">
                                        {"profile"}
                                    </p>
                                </div>
                            </div> */}
            <DropDownItem
              label="profile"
              className="mb-2"
              isLink={true}
              href={`/${(session.user as any).username}`}
            />
            <DropDownItem
              label="settings"
              className="mb-2"
              isLink={true}
              href="/settings"
            />
            <DropDownItem
              label="sign out"
              className="mb-3"
              onClick={() => signOut()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DropDownItem({
  label,
  className = "",
  isLink = false,
  href = "",
  onClick = () => {},
}) {
  const [isHovering, setIsHovering] = useState(false);

  if (isLink && href) {
    return (
      <a
        href={href}
        onClick={onClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`relative w-full items-center justify-end flex ${
          className ? className : ""
        }`}
      >
        <p className={`transition-opacity ${isHovering ? "opacity-0" : ""}`}>
          {label}
        </p>
        <p
          className={`absolute text-transparent transition-opacity duration-300 opacity-0 ${
            isHovering ? "opacity-100" : ""
          } bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple`}
        >
          {label}
        </p>
      </a>
    );
  } else {
    return (
      <div
        onClick={onClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`relative w-full items-center justify-end flex ${
          className ? className : ""
        }`}
      >
        <p className={`transition-opacity ${isHovering ? "opacity-0" : ""}`}>
          {label}
        </p>
        <p
          className={`absolute text-transparent transition-opacity duration-300 opacity-0 ${
            isHovering ? "opacity-100" : ""
          } bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple`}
        >
          {label}
        </p>
      </div>
    );
  }
}
