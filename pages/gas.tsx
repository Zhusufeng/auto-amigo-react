import { useSession } from "next-auth/react";
import Head from "./components/Head";
import Layout from "./components/Layout";
import GasContainer from "./components/GasContainer";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Head title="Auto Amgio - Gas" />
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
