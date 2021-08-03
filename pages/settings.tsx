import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import App from "../components/Settings/App";
import User from "../components/Settings/User";
import Text100VH from "../components/UIKit/Text/Text100VH";

export default function Settings() {
  const [scrollHeight, setScrollHeight] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  function handleScroll(e) {
    // console.log(e.target.scrollTop);
    // console.log("height: ", e.target.offsetHeight);

    setScrollHeight(e.target.scrollTop);
    setScrollPercent((e.target.scrollTop / e.target.offsetHeight) * 100);
  }

  function ScrollBar({ scrollPercent }) {
    useEffect(() => {
      console.log((document?.querySelector("#user") as any).offsetTop);
    }, [scrollHeight]);

    return (
      <div className="relative flex w-0.5 h-full pb-2">
        <div className="w-full h-full bg-gradient-to-br from-100vh-cyan to-100vh-purple" />
        <div
          className="absolute bottom-0 flex w-full transition-all bg-100vh-gray"
          style={{ height: `${100 - scrollPercent}%` }}
        />
      </div>
    );
  }
  return (
    <div
      className="flex flex-col items-center justify-center w-full max-h-screen min-h-screen bg-100vh-gray"
      style={{ paddingTop: "92px" }}
    >
      <Navbar />
      <div
        className="flex items-center justify-center w-11/12 h-full pt-20 text-white animate-fadeIn"
        style={{ height: "calc(100vh - 92px)" }}
      >
        <div
          id="SettingsContainer"
          onScroll={handleScroll}
          className="flex flex-col items-center justify-start flex-grow h-full px-4 ml-4 overflow-y-auto no-scrollbar"
          style={{ scrollBehavior: "smooth" }}
        >
          <App />
          <User />
        </div>
        <div
          className="flex flex-col items-center justify-start w-full h-full pb-10"
          style={{ maxWidth: "300px" }}
        >
          <h1 className="self-start text-4xl font-bold">settings</h1>
          <div className="my-4 w-full h-0.5 bg-gradient-to-br from-100vh-cyan to-100vh-purple" />
          <div className="flex w-full">
            <ScrollBar scrollPercent={scrollPercent} />
            <div className="flex flex-col items-start justify-start w-full ml-3 text-xl font-medium">
              {process.browser && (
                <>
                  <Text100VH
                    label="app"
                    isLink={true}
                    href="#app"
                    className="mb-3"
                    defaultGradient={
                      scrollHeight >= 0 &&
                      scrollHeight <
                        (document?.querySelector("#app") as any)?.offsetTop
                    }
                  />
                  <Text100VH
                    label="user"
                    isLink={true}
                    href="#user"
                    className="mb-3"
                    defaultGradient={
                      scrollHeight >=
                      (document?.querySelector("#app") as any)?.offsetTop
                    }
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
