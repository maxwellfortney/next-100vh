import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider, useSession } from "next-auth/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>100vh</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
