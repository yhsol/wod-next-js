import { readdirSync } from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import { join } from 'path';
import { ParsedUrlQuery } from 'querystring';

// extends ParsedUrlQuery 를 해줘야 함.
export interface ArticleProps extends ParsedUrlQuery {
  slug: string;
}

const POSTS_PATH = join(process.cwd(), '_articles');

export function Article(props: ArticleProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Visiting, {props.slug}</h1>
    </div>
  );
}

// getStaticProps
export const getStaticProps: GetStaticProps<ArticleProps> = async ({
  params,
}: {
  params: ArticleProps;
}) => {
  return {
    props: {
      slug: params.slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {
  // _articles 폴더의 파일을 읽고 파일 제목을 slug 로 사용.
  const paths = readdirSync(POSTS_PATH)
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({
      params: { slug },
    }));

  return {
    paths,
    fallback: false,
  };
};

export default Article;
