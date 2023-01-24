import { join } from 'path';
import { readFileSync } from 'fs';
import * as matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

export const getParsedFileContentBySlug = (
  fileName: string,
  postsPath: string
) => {
  const postFilePath = join(postsPath, `${fileName}.mdx`);
  const fileContent = readFileSync(postFilePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    frontMatter: data,
    content,
  };
};

export const renderMarkdown = (markdownContent: string) => {
  return serialize(markdownContent || '');
};
