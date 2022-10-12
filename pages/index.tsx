import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <h1>/pages/index.tsx</h1>
      <ul>
        <li>
          <Link href={"/sub"}>/pages/sub/index.tsx</Link>
        </li>
        <li>
          <Link href={"/sub/about"}>/pages/sub/about.tsx</Link>
        </li>
        <li>
          <Link href={"/sub/1"}>/pages/sub/[pid].tsx - pid is 1</Link>
        </li>
        <li>
          <Link href={"/sub/2"}>/pages/sub/[pid].tsx - pid is 2</Link>
        </li>
        <li>
          <Link href={"/sub/fetch"}>/pages/sub/fetch.tsx</Link>
        </li>
        <li>
          <Link href={"/sub/news"}>/pages/sub/news.tsx</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
