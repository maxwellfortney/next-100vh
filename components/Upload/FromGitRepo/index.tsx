import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import Box100VH from "../../UIKit/Boxes/Box100VH";

export default function FromGitRepo({}) {
  function SelectOrganization() {
    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
      setIsOpen(!isOpen);
    }

    return (
      <button
        onClick={handleClick}
        className="relative flex items-center justify-start flex-none w-3/5 px-2 py-2.5 mr-2 border border-gray-400"
      >
        <FaGithub className="text-lg" />
        <div className="relative flex items-center flex-1 text-left">
          <p className="absolute left-0 w-full px-2 truncate overflow-ellipsis">
            maxwellfortney
          </p>
        </div>
        <svg
          className={`w-5 h-5 ease-in-out transition-all ${
            isOpen ? "rotate-180 transform" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <div
          className={`absolute left-0 z-10 origin-top transform flex w-full mt-2 transition-all top-full bg-100vh-gray ${
            isOpen
              ? "visible opacity-100 scale-y-100"
              : "invisible opacity-0 scale-y-50"
          }`}
        >
          maxwell
        </div>
      </button>
    );
  }

  return (
    <Box100VH className="flex flex-col items-center justify-start p-3">
      <h1 className="self-start mb-3 text-2xl font-bold">import github repo</h1>
      <div className="flex justify-between w-full max-w-full">
        <SelectOrganization />
        <div className="flex items-center justify-start flex-1 px-2 py-2.5 border border-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            className="w-full min-w-0 px-1 outline-none bg-100vh-gray"
            placeholder="search"
          />
        </div>
      </div>
      <div className="relative flex flex-1 w-full my-3">
        <div className="absolute top-0 left-0 flex flex-col w-full h-full overflow-y-scroll border border-gray-400">
          a
        </div>
      </div>
      <p className="self-start text-md">import from git url →</p>
    </Box100VH>
  );
}
