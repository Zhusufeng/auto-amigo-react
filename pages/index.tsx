import Head from "next/head";
import GasContainer from "./components/GasContainer";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Auto Amigo</title>
        <meta name="description" content="Auto Amigo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavBar />
        <GasContainer />
      </main>
    </>
  );
}
