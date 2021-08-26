import { getSession } from "next-auth/client";
import Head from "next/head";
import Inbox from "../../components/Messages/Inbox";
import MenuBar from "../../components/Messages/MenuBar";
import Navbar from "../../components/Navbar/Navbar";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/401",
                permanent: false,
            },
        };
    } else {
        return {
            props: {},
        };
    }
}

export default function Messages() {
    return (
        <div
            className="flex flex-col items-center justify-center w-full min-h-screen bg-100vh-gray"
            style={{ paddingTop: "92px" }}
        >
            <Head>
                <title>messages | 100vh</title>
            </Head>
            <Navbar />

            <div className="flex flex-col items-center justify-start flex-1 w-11/12 mt-8 text-white">
                <MenuBar />
                <Inbox />
            </div>
        </div>
    );
}
