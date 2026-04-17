import matter from 'gray-matter';
import { marked } from 'marked';

const contentFiles = import.meta.glob('/content/**/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

export function getContent(slug: string, locale: string) {
	const path = `/content/${slug}/${locale}.md`;
	const raw = contentFiles[path] as string | undefined;
	if (!raw) throw new Error(`Content not found: ${path}`);

	const { data: frontmatter, content } = matter(raw);
	const html = marked(content);

	return { frontmatter: frontmatter as Record<string, string>, html: html as string };
}
