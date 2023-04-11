import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Link href="/">Auto Amigo</Link>
      </div>
      <div>
        <Link href="/gas">Gas Log</Link>
      </div>
      <div>
        {session ? (
          <>
            Signed in as {session?.user?.email}
            <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            Not signed in
            <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
