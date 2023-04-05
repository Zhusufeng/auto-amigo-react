import Head from "next/head";
import GasContainer from "./components/GasContainer";

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
        <div>Hello!</div>
        <GasContainer />
      </main>
    </>
  );
}
