import { readdirSync } from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import { join } from 'path';
import { ParsedUrlQuery } from 'querystring';
import {
  getParsedFileContentBySlug,
  renderMarkdown,
} from '@second-wod/markdown';
import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import dynamic from 'next/dynamic';

// extends ParsedUrlQuery 를 해줘야 함.
// why? => ParsedUrlQuery is a built-in Next.js type that represents the query string of a URL parsed into an object. It's used here because the slug property is expected to come from the query string of the URL.
export interface ArticlePageProps extends ParsedUrlQuery {
  slug: string;
}

const mdxElements = {
  Youtube: dynamic(async () => {
    return await import('@second-wod/shared/mdx-elements/youtube/youtube');
  }),
  // a: CustomLink,
};

interface ArticleProps {
  frontMatter: any;
  html: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
}

const POSTS_PATH = join(process.cwd(), '_articles');

export function Article({ frontMatter, html }: ArticleProps) {
  return (
    <div className="m-6">
      <article className="prose porse-lg">
        <h1>{frontMatter.title}</h1>
        <div>by {frontMatter.author.name}</div>
      </article>

      <hr />

      <MDXRemote {...html} components={mdxElements} />
    </div>
  );
}

export const getStaticProps: GetStaticProps<ArticleProps> = async ({
  params,
}: {
  params: ArticlePageProps;
}) => {
  // 1. parse the content of our markdown and separate it into frontmatter and content
  const { frontMatter, content } = getParsedFileContentBySlug(
    params.slug,
    POSTS_PATH
  );

  // 2. convert markdown content to html
  const html = await renderMarkdown(content);

  return {
    props: { frontMatter, html },
  };
};

export const getStaticPaths: GetStaticPaths<ArticlePageProps> = async () => {
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
