import Image from "next/image";
import Link from "next/link";

const Photo = () => {
  return (
    <div>
      <h1>Photo</h1>
      <Image
        src={
          "https://media.gettyimages.com/photos/the-natural-arch-of-drangarnir-beach-view-from-a-cliff-around-in-picture-id1413257801"
        }
        alt=""
        width={500}
        height={500}
      />
      <li>
        <Link href={"/photo"}>Photo</Link>
      </li>
    </div>
  );
};

export default Photo;
