import { renderMarkdown } from './markdown';

jest.mock('next-mdx-remote/serialize', () => ({
  serialize: jest.fn().mockReturnValue('<h1>Title</h1><h2>Subtitle</h2>'),
}));

describe('markdown', () => {
  test('renderMarkdown should correctly serialize markdown content', () => {
    const markdownContent = '# Title\n ## Subtitle';
    const expectedSerializedContent = '<h1>Title</h1><h2>Subtitle</h2>';
    const serializedContent = renderMarkdown(markdownContent);
    expect(serializedContent).toBe(expectedSerializedContent);
  });
});
