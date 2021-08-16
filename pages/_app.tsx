import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider session={pageProps.session}>
            <Head>
                <title>100vh</title>

                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="favicon-16x16.png"
                />
                {/* <link rel="manifest" href="site.webmanifest" /> */}
                <link
                    rel="mask-icon"
                    href="safari-pinned-tab.svg"
                    color="#5bbad5"
                />
                <link rel="shortcut icon" href="favicon.ico" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="msapplication-config" content="browserconfig.xml" />
                <meta name="theme-color" content="#131313" />
            </Head>
            <Container100VH>
                <Component {...pageProps} />
            </Container100VH>
        </Provider>
    );
}

function Container100VH({ children }) {
    const [session, loading] = useSession();
    const router = useRouter();

    // useEffect(() => {
    //     console.log(session);
    //     console.log(!loading && session);

    //     if (!loading && session) {
    //         if (session.user.username === null) {
    //         }
    //     }
    // }, [loading, session]);

    useEffect(() => {
        console.log(router);
    }, [router.pathname]);

    if (loading) return null;

    if (
        session &&
        session.user.username === null &&
        router.pathname !== "/signup/new"
    ) {
        console.log("user requires username redirecting to /signup/new");
        router.push("/signup/new");
    }

    return <>{children}</>;
}

export default MyApp;
