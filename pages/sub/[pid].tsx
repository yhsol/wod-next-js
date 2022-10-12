import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Profile = () => {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <div>
      <h1>/pages/sub/[pid].tsx</h1>
      <h2>User: {pid}</h2>
      <ul>
        <li>
          <Link href={"/"}>/pages/index.tsx</Link>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
