import Link from "next/link";

const hello = ({ name }: { name: string }) => {
  return (
    <div>
      <h1>/sub/hello</h1>
      <h2>{name}</h2>
      <div>
        <Link href={"/"}>/pages/index.tsx</Link>
      </div>
    </div>
  );
};

// This gets called on every request
export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hello`);
  const data = await res.json();

  return { props: data };
}

export default hello;
