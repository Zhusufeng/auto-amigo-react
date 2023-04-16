import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "antd";

const itemStyle: React.CSSProperties = {
  padding: "0 10px",
};

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <div style={{ display: "flex" }}>
      <div style={itemStyle}>
        <Link href="/">Auto Amigo</Link>
      </div>
      <div style={itemStyle}>
        <Link href="/gas">Gas Log</Link>
      </div>
      <div style={itemStyle}>
        {session ? (
          <>Signed in as {session?.user?.email}</>
        ) : (
          <>Not signed in</>
        )}
      </div>
      <div style={itemStyle}>
        {session ? (
          <Button onClick={() => signOut()}>Sign out</Button>
        ) : (
          <Button onClick={() => signIn()}>Sign in</Button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
