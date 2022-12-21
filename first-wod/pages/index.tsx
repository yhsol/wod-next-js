import { User } from "@supabase/supabase-js";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const Home: NextPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const user = await supabase.auth.getUser();
      console.log("🚀 turbo : user", user.data.user);

      setUser(user.data.user);
    })();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">/pages/index.tsx</h1>
      <h2>{user?.user_metadata.user_name}</h2>
      <ul>
        <li>
          <Link href={"/sub/about"}>About</Link>
        </li>
        <li>
          <Link href={"/sub/photo"}>Photo</Link>
        </li>
        <li>
          <Link href={"/sub/supabase-note"}>Supabase Note</Link>
        </li>
        <li>
          <Link href={"/auth/login"}>Login</Link>
        </li>
        <li>
          <Link href={"/auth/logout"}>Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
