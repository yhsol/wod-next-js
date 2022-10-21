import Link from "next/link";
import { useEffect, useState } from "react";

const Fetch = () => {
  const [user, setUser] = useState<{ name: string }>();

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hello`);
      const user = await res.json();
      setUser(user);
    })();
  });

  return (
    <div>
      <h1>/pages/sub/fetch.tsx</h1>
      <div>User: {user?.name}</div>
      <div>
        <Link href={"/"}>/pages/index.tsx</Link>
      </div>
    </div>
  );
};

export default Fetch;
