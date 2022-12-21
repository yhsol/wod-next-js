import Image from "next/image";

const Photo = () => {
  return (
    <div>
      <h1>Photo</h1>
      <h2>some changes</h2>
      <Image
        src={
          "https://media.gettyimages.com/photos/the-natural-arch-of-drangarnir-beach-view-from-a-cliff-around-in-picture-id1413257801"
        }
        alt=""
        width={500}
        height={500}
      />
    </div>
  );
};

export default Photo;
