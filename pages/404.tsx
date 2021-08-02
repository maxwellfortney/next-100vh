import Navbar from "../components/Navbar/Navbar";
import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-100vh-gray">
      <Head>
        <title>404 | 100vh</title>
      </Head>
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-black text-transparent text-7xl bg-clip-text bg-gradient-to-br from-100vh-cyan to-100vh-purple">
          404
        </h1>
        <p className="mt-10 text-2xl font-medium text-white">Page Not Found</p>
        <p
          className="mt-5 text-center text-white"
          style={{ maxWidth: "350px" }}
        >{`The requested page doesn't exist or you don't have access to it.`}</p>
        <div className="flex items-center justify-center mt-10 text-sm text-white">
          <Link href="/">
            <a className="pb-2 transition-all duration-300 border-b-2 border-transparent hover:border-white">
              home
            </a>
          </Link>
          <Link href="/jobs">
            <a className="pb-2 mx-3 transition-all duration-300 border-b-2 border-transparent hover:border-white">
              find work
            </a>
          </Link>
          <Link href="/inspiration">
            <a className="pb-2 transition-all duration-300 border-b-2 border-transparent hover:border-white">
              inspiration
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
