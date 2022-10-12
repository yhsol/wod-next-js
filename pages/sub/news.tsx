import Link from "next/link";
import { loadPosts } from "../lib/load-posts";

export type News = {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  time_ago: string;
  comments_count: number;
  type: string;
  url: string;
  domain: string;
};

type Props = {
  posts: News[];
};

const News = ({ posts }: Props) => {
  return (
    <div>
      <h1>Hacker News</h1>
      <div>
        {posts.map((post, index) => {
          return (
            <div key={post.id}>
              {index + 1}: {post.title}
            </div>
          );
        })}
      </div>
      <div>
        <Link href={"/"}>/pages/index.tsx</Link>
      </div>
    </div>
  );
};

// if API route is called directly from getStaticProps, produces an additional call, reducing performance.
// Instead, the logic for fetching the data can be shared by using a lib/ directory.
// Then it can be shared with getStaticProps.
export async function getStaticProps() {
  const posts: News[] = await loadPosts();

  return {
    props: {
      posts,
    },
  };
}

export default News;
