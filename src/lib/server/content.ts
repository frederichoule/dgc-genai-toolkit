import { marked } from 'marked';

const contentFiles = import.meta.glob('/content/**/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

function parseFrontmatter(raw: string) {
	const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!match) return { frontmatter: {} as Record<string, string>, content: raw };

	const frontmatter: Record<string, string> = {};
	for (const line of match[1].split('\n')) {
		const idx = line.indexOf(':');
		if (idx === -1) continue;
		const key = line.slice(0, idx).trim();
		const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
		if (key) frontmatter[key] = value;
	}
	return { frontmatter, content: match[2] };
}

export function getContent(slug: string, locale: string) {
	const path = `/content/${slug}/${locale}.md`;
	const raw = contentFiles[path] as string | undefined;
	if (!raw) throw new Error(`Content not found: ${path}`);

	const { frontmatter, content } = parseFrontmatter(raw);
	const html = marked(content);

	return { frontmatter, html: html as string };
}
