import { and, eq } from 'drizzle-orm';
import { getDb } from './db';
import { marked } from '$lib/markdown';
import { contentBlock } from './db/schema';
import { cachify } from './cache';

export function parseFrontmatter(raw: string) {
	const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!match) return { frontmatter: {} as Record<string, string>, content: raw };

	const frontmatter: Record<string, string> = {};
	for (const line of match[1].split('\n')) {
		const idx = line.indexOf(':');
		if (idx === -1) continue;
		const key = line.slice(0, idx).trim();
		const value = line
			.slice(idx + 1)
			.trim()
			.replace(/^["']|["']$/g, '');
		if (key) frontmatter[key] = value;
	}
	return { frontmatter, content: match[2] };
}

export async function getContent(env: Env, slug: string, locale: string) {
	return cachify(env.CACHE, `content:${slug}:${locale}`, async () => {
		const db = getDb(env.DB);
		const row = await db
			.select({ body: contentBlock.body })
			.from(contentBlock)
			.where(and(eq(contentBlock.slug, slug), eq(contentBlock.locale, locale)))
			.get();
		if (!row) throw new Error(`Content not found: ${slug}/${locale}`);

		const { frontmatter, content } = parseFrontmatter(row.body);
		const html = await marked.parse(content);
		return { frontmatter, html };
	});
}
