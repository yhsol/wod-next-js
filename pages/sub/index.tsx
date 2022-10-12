import { NextPage } from "next";
import Link from "next/link";
import React from "react";

const Sub: NextPage = () => {
  return (
    <div>
      <h1>/pages/sub/index.tsx</h1>
      <ul>
        <li>
          <Link href={"/"}>/pages/index.tsx</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sub;
