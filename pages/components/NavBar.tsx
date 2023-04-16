import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <div style={{ display: "flex" }}>
      <div style={{ padding: "0 10px" }}>
        <Link href="/">Auto Amigo</Link>
      </div>
      <div style={{ padding: "0 10px" }}>
        <Link href="/gas">Gas Log</Link>
      </div>
      <div style={{ padding: "0 10px" }}>
        {session ? (
          <>Signed in as {session?.user?.email}</>
        ) : (
          <>Not signed in</>
        )}
      </div>
      <div style={{ padding: "0 10px" }}>
        {session ? (
          <button onClick={() => signOut()}>Sign out</button>
        ) : (
          <button onClick={() => signIn()}>Sign in</button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
