import { useEffect, useState } from "react";
import SignUp from "../SignUp/SignUp";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { CSSTransition } from "react-transition-group";
import { useRouter } from "next/dist/client/router";

import { signIn, signOut, useSession } from "next-auth/client";

export default function Navbar() {
  const [session, loading] = useSession();

  const router = useRouter();
  const { query, pathname } = router;

  const [scrollHeight, setScrollHeight] = useState(0);
  const [blurBg, setBlurBg] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    console.log(session);
  }, [session]);

  useEffect(() => {
    document
      .querySelector("#main-container")
      ?.addEventListener("scroll", () => {
        if (
          Math.abs(
            scrollY -
              (document?.querySelector("#main-container")?.scrollTop as number)
          ) > 10
        ) {
          setScrollY(
            document?.querySelector("#main-container")?.scrollTop as number
          );
          console.log(scrollY);
        }
      });
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      if (Math.abs(mouseY - e.clientY) > 10) {
        setMouseY(e.clientY);
        console.log(mouseY);
      }
    });
  }, []);

  function handleButtonClick({ type }: any) {
    if (!blurBg) {
      setBlurBg(true);
      if ((type = "signIn")) {
        setIsSignIn(true);
        setIsSignUp(false);
      } else if (type === "signUp") {
        setIsSignIn(false);
        setIsSignUp(true);
      }
    } else if (isSignIn) {
      setIsSignIn(false);
      setIsSignUp(true);
    } else if (isSignUp) {
      setIsSignIn(true);
      setIsSignUp(false);
    } else {
      setBlurBg(false);
      setIsSignIn(false);
      setIsSignUp(false);
    }
  }

  return (
    <>
      {/* {blurBg ? (

                <div
                    onClick={() => setBlurBg(false)}
                    className="fixed top-0 left-0 z-20 w-screen h-screen bg-black opacity-80"
                >
                    <div className="flex"></div>
                </div>
            ) : null} */}
      {/* {menuOpen ? <MobileMenu menuOpen={menuOpen} /> : null} */}
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <CSSTransition in={blurBg} timeout={200} classNames="fade" unmountOnExit>
        <SignUp
          blurBg={blurBg}
          setBlurBg={setBlurBg}
          isSignIn={isSignIn}
          isSignUp={isSignUp}
        />
      </CSSTransition>
      <div
        className="fixed z-10 flex items-center justify-between mt-8 transition-all duration-300"
        style={{
          height: "60px",
          width: "95%",
          top:
            process.browser &&
            scrollY > document.documentElement.clientHeight / 2 &&
            mouseY > document.documentElement.clientHeight * 0.2
              ? "-100px"
              : "0",
        }}
      >
        <div className="flex items-center h-full">
          <Link href="/">
            <a className="text-5xl font-black text-transparent transition-opacity duration-300 md:text-6xl hover:opacity-40 bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple">
              100vh
            </a>
          </Link>
          <div
            className="hidden h-full mx-4 bg-white md:flex"
            style={{ width: "3px" }}
          />
          <div className="items-center hidden h-full text-xl font-extrabold text-white md:flex">
            <Link href="/jobs">
              <a
                className={`${
                  pathname === "/jobs" ? "border-white" : ""
                } py-3 mr-4 transition-all duration-500 border-b-2 border-transparent hover:border-white`}
                style={{ marginTop: "2px" }}
              >
                find work
              </a>
            </Link>
            <Link href="/about">
              <a
                style={{ marginTop: "2px" }}
                className="py-3 mr-4 transition-all duration-500 border-b-2 border-transparent hover:border-white"
              >
                about
              </a>
            </Link>
            <Link href="/inspiration">
              <a
                style={{ marginTop: "2px" }}
                className="py-3 transition-all duration-500 border-b-2 border-transparent hover:border-white"
              >
                inspiration
              </a>
            </Link>
          </div>
        </div>
        <div className="flex md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`hamburger hamburger--slider
            ${menuOpen ? "is-active" : ""}`}
            type="button"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>
        <div className="items-center hidden h-full text-xl font-extrabold text-white md:flex">
          {/* <div className="flex mr-4">sign up</div>
                <div className="flex items-center h-full px-4 transition-all hover:bg-100vh-gray hover:from-100vh-gray hover:to-100vh-gray bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                    sign in
                </div> */}
          {/* <AnimatedButton label="sign up" /> */}
          {session ? (
            <>
              <div className="relative flex mr-2 cursor-pointer group bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                <div
                  className="absolute flex transition-all duration-200 opacity-100 bg-100vh-gray group-hover:opacity-0"
                  style={{
                    top: "-1px",
                    left: "-1px",
                    width: "calc(100% + 2px)",
                    height: "calc(100% + 2px)",
                  }}
                />
                <Link href={`/${session.user?.name}`}>
                  <a
                    className={`flex justify-center w-full px-4 py-3 m-1 bg-100vh-gray`}
                    style={{ zIndex: 1 }}
                  >
                    {session.user?.email}
                  </a>
                </Link>
              </div>
              <Link href="/upload">
                <a className="flex items-center justify-center h-full px-4 bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                  upload
                </a>
              </Link>
            </>
          ) : (
            <>
              {/* <Link href="/api/auth/login"> */}
              <a className="relative flex mr-2 cursor-pointer group bg-gradient-to-br from-100vh-cyan to-100vh-purple">
                <div
                  className="absolute flex transition-all duration-200 opacity-100 bg-100vh-gray group-hover:opacity-0"
                  style={{
                    top: "-1px",
                    left: "-1px",
                    width: "calc(100% + 2px)",
                    height: "calc(100% + 2px)",
                  }}
                />
                <div
                  onClick={() => {
                    handleButtonClick("signUp");
                    // signIn();
                  }}
                  className={`flex justify-center w-full px-5 py-3 m-1 bg-100vh-gray`}
                  style={{ zIndex: 1 }}
                >
                  sign up
                </div>
              </a>
              {/* </Link> */}
              {/* <Link href="/api/auth/login"> */}
              <a
                onClick={() => handleButtonClick("signIn")}
                className="flex items-center justify-center h-full px-4 bg-gradient-to-br from-100vh-cyan to-100vh-purple"
              >
                sign in
              </a>
              {/* </Link> */}
            </>
          )}
        </div>
      </div>
    </>
  );
}
