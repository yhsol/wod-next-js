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
          <Link href={"/sub/about"}>About</Link>
        </li>
        <li>
          <Link href={"/sub/photo"}>Photo</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
