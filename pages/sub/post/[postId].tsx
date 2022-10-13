import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { loadPosts } from "../../lib/load-posts";
import { News } from "../news";

const Post = ({ post }: { post: News }) => {
  const router = useRouter();
  const { postId } = router.query;

  return (
    <div>
      <h1>/pages/sub/[postId].tsx</h1>
      <h2>ID: {postId}</h2>
      <h2>Title: {post.title}</h2>
      <a href={post.url} target="_blank" rel="noreferrer">
        link
      </a>

      <ul>
        <li>
          <Link href={"/"}>/pages/index.tsx</Link>
        </li>
        <li>
          <Link href={"/sub/news"}>/pages/sub/news.tsx</Link>
        </li>
      </ul>
    </div>
  );
};

export async function getStaticPaths() {
  const posts = await loadPosts();

  const paths = posts.map((post) => ({
    // 스트링으로 전달해 줘야 함. https://nextjs.org/docs/messages/invalid-getstaticpaths-value
    params: { postId: String(post.id) },
  }));

  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

type GetStaticProps = { params: { postId: string } };
export async function getStaticProps({ params }: GetStaticProps) {
  const posts = await loadPosts();

  return {
    props: { post: posts.find((post) => String(post.id) === params.postId) },
  };
}

export default Post;
