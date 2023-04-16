import { useSession } from "next-auth/react";
import Head from "next/head";
import Layout from "./components/Layout";
import GasContainer from "./components/GasContainer";
import NavBar from "./components/NavBar";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Auto Amigo - Gas</title>
        <meta name="description" content="Auto Amigo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {session ? (
          <GasContainer />
        ) : (
          <div>You need to sign in to see your gas log</div>
        )}
      </Layout>
    </>
  );
}
