import { getSession, useSession } from "next-auth/client";
import { useState, useEffect } from "react";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            props: {},
        };
    }

    const res = await fetch(
        "/api/users/getByUsername/" + (session?.user as any).username
    );

    if (res.status === 200) {
        return {
            props: {
                userProp: await res.json(),
            },
        };
    }
    return {
        props: {}, // will be passed to the page component as props
    };
}

export default function User({ userProp = {} }) {
    const [session, loading] = useSession();
    const [user, setUser] = useState({});

    useEffect(() => {
        if (userProp) {
            setUser(userProp);
        }
    }, []);

    async function fetchUser() {
        const res = await fetch(
            "/api/users/getByUsername/" + (session?.user as any).username
        );

        if (res.status === 200) {
            setUser(await res.json());
        }
        console.log(user);
    }

    useEffect(() => {
        if (session) {
            fetchUser();
        }
    }, [session]);

    return (
        <div
            id="user"
            className="flex flex-col w-full"
            style={{ minHeight: "calc(100vh - 172px)" }}
        >
            <h2 className="text-4xl font-semibold">user</h2>
            <div className="flex flex-col mr-6">
                <div className="flex flex-col flex-1 mt-10 mb-4">
                    <p className="mb-1 ml-1 text-sm md:text-md opacity-80 hover:opacity-100">
                        username
                    </p>
                    <input
                        type="text"
                        className="flex-1 px-2 py-2 transition-opacity duration-300 border-2 hover:opacity-100 bg-100vh-gray focus:opacity-100 opacity-60"
                        style={{ borderColor: "#282828" }}
                        value={user ? (user as any).username : ""}
                    />
                </div>

                <div className="relative flex flex-col flex-1 mb-4">
                    <p className="mb-1 ml-1 text-sm md:text-md opacity-80">
                        email
                    </p>
                    <input
                        disabled={true}
                        type="text"
                        className="flex-1 px-2 py-2 transition-opacity duration-300 border-2 cursor-not-allowed focus:opacity-100 opacity-60 bg-100vh-gray"
                        style={{ borderColor: "#282828" }}
                        value={user ? (user as any).email : ""}
                    />
                </div>

                <div className="flex items-center mb-4">
                    <div className="flex flex-col flex-1 mr-1 md:mr-2">
                        <p className="mb-1 ml-1 text-sm md:text-md opacity-80 hover:opacity-100">
                            first name
                        </p>
                        <input
                            type="text"
                            className="flex-1 px-2 py-2 transition-opacity duration-300 border-2 hover:opacity-100 bg-100vh-gray focus:opacity-100 opacity-60"
                            style={{ borderColor: "#282828" }}
                            value={
                                user ? (user as any)?.name?.split(" ")[0] : ""
                            }
                        />
                    </div>
                    <div className="flex flex-col flex-1 ml-1 md:ml-2">
                        <p className="mb-1 ml-1 text-sm md:text-md opacity-80 hover:opacity-100">
                            last name
                        </p>
                        <input
                            type="text"
                            className="flex-1 px-2 py-2 transition-opacity duration-300 border-2 hover:opacity-100 bg-100vh-gray focus:opacity-100 opacity-60"
                            style={{ borderColor: "#282828" }}
                            value={
                                user ? (user as any)?.name?.split(" ")[1] : ""
                            }
                        />
                    </div>
                </div>

                <div className="relative flex flex-col flex-1 mb-4">
                    <p className="mb-1 ml-1 text-sm md:text-md opacity-80">
                        bio
                    </p>
                    <input
                        type="text"
                        className="flex-1 px-2 py-2 transition-opacity duration-300 border-2 opacity-60 hover:opacity-100 bg-100vh-gray focus:opacity-100"
                        style={{ borderColor: "#282828" }}
                        value={user ? (user as any).bio : ""}
                    />
                </div>
            </div>
        </div>
    );
}
