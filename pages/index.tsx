import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">/pages/index.tsx</h1>
      <ul>
        <li>
          <Link href={"/sub/about"}>About</Link>
        </li>
        <li>
          <Link href={"/sub/photo"}>Photo</Link>
        </li>
        <li>
          <Link href={"/sub/supabase-note"}>Supaabse Note</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
