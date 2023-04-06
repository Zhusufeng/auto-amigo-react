import { useSession, signIn, signOut } from "next-auth/react";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <div style={{ display: "flex" }}>
      <div>Auto Amigo</div>
      <div>Gas Log</div>
      <div>
        {session ? (
          <>
            Signed in as {session.user?.email}
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
