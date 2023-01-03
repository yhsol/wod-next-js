import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

// extends ParsedUrlQuery 를 해줘야 함.
export interface ArticleProps extends ParsedUrlQuery {
  slug: string;
}

export function Article(props: ArticleProps) {
  return (
    <div>
      <h1>Visiting, {props.slug}</h1>
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
  return {
    paths: [
      {
        // getStaticProps 로 가는 값.
        params: {
          slug: 'page1',
        },
      },
      {
        params: {
          slug: 'page2',
        },
      },
    ],
    fallback: false,
  };
};

export default Article;
