import { and, eq } from 'drizzle-orm';
import { getDb } from './db';
import { contentBlock } from './db/schema';
import { parseFrontmatter } from './content';
import { marked } from '$lib/markdown';
import { cachify } from './cache';

export interface GlossaryEntry {
	id: string;
	title: string;
	bodyHtml: string;
}

export interface GlossaryData {
	frontmatter: Record<string, string>;
	introHtml: string;
	entries: GlossaryEntry[];
}

export async function getGlossary(env: Env, locale: string): Promise<GlossaryData> {
	return cachify(env.CACHE, `glossary:${locale}`, async () => {
		const db = getDb(env.DB);
		const row = await db
			.select({ body: contentBlock.body })
			.from(contentBlock)
			.where(and(eq(contentBlock.slug, 'glossary'), eq(contentBlock.locale, locale)))
			.get();
		if (!row) throw new Error(`Content not found: glossary/${locale}`);

		const { frontmatter, content } = parseFrontmatter(row.body);

		const lines = content.split('\n');
		const introLines: string[] = [];
		const entries: { title: string; body: string[] }[] = [];
		let current: (typeof entries)[number] | null = null;

		for (const line of lines) {
			const h2 = line.match(/^##\s+(.+?)\s*$/);
			if (h2) {
				current = { title: h2[1], body: [] };
				entries.push(current);
				continue;
			}
			if (current) current.body.push(line);
			else introLines.push(line);
		}

		const introHtml = await marked.parse(introLines.join('\n').trim());
		const rendered: GlossaryEntry[] = await Promise.all(
			entries.map(async (e, i) => ({
				id: String(i),
				title: e.title,
				bodyHtml: await marked.parse(e.body.join('\n').trim())
			}))
		);

		return { frontmatter, introHtml, entries: rendered };
	});
}
