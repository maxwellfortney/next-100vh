import Link from "next/link";
import Navbar from "../components/Navbar/Navbar";
import Button100VH from "../components/UIKit/Buttons/Button100VH";

export function getStaticProps() {
  // Dev only route
  return {
    props: {
      notFound: process.env.NODE_ENV === "production" ? true : false,
    },
  };
}
export default function About() {
  return (
    <div className="flex flex-col items-center justify-start w-full max-h-screen min-h-screen bg-100vh-gray">
      <div
        className="flex items-center w-11/12 py-2 text-xl font-extrabold text-white bg-100vh-gray"
        // style={{ height: "70px" }}
      >
        <Link href="/">
          <a className="transition-opacity duration-300 hover:opacity-40">
            ← home
          </a>
        </Link>
        <div
          className="ml-2 bg-white"
          style={{ height: "25px", width: "2px" }}
        />
        <a
          href="#Buttons"
          className="py-2 mx-2 transition-all duration-300 hover:opacity-40"
        >
          buttons
        </a>
      </div>
      <div
        className="flex flex-col items-center justify-start flex-1 w-full h-full pt-12 overflow-y-auto text-white"
        style={{ scrollBehavior: "smooth" }}
      >
        <div
          id="Buttons"
          className="flex flex-col items-center justify-center w-11/12"
        >
          <h1 className="self-start pb-3 text-3xl font-extrabold border-b-2 border-white">
            buttons
          </h1>
          <div className="flex items-center w-full mb-2">
            <p className="">type 1: </p>
            <div className="flex items-center justify-center flex-grow">
              <Button100VH styleType={1} label="type 1" />
            </div>
          </div>
          <div className="flex items-center w-full mb-2">
            <p className="">type 2: </p>
            <div className="flex items-center justify-center flex-grow">
              <Button100VH styleType={2} label="type 2" />
            </div>
          </div>
          <div className="flex items-center w-full mb-2">
            <p className="">type 3: </p>
            <div className="flex items-center justify-center flex-grow">
              <Button100VH styleType={3} label="type 3" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-100vh-gray">
          a
        </div>
      </div>
    </div>
  );
}
