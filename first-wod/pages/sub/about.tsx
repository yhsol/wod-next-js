import Link from "next/link";

const About = () => {
  return (
    <div>
      <h1>About Page</h1>
      <ul>
        <li>
          <Link href={"/"}>/pages/index.tsx</Link>
        </li>
        <li>
          <Link href={"/sub"}>/pages/sub/index.tsx</Link>
        </li>
      </ul>
    </div>
  );
};

export default About;
