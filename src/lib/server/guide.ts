import { and, eq } from 'drizzle-orm';
import { marked } from 'marked';
import { getDb } from './db';
import { contentBlock } from './db/schema';
import { parseFrontmatter } from './content';

export interface GuideCard {
	id: string;
	number: string;
	title: string;
	bodyHtml: string;
}

export interface GuideSection {
	title: string;
	cards: GuideCard[];
}

export interface GuideData {
	frontmatter: Record<string, string>;
	introHtml: string;
	sections: GuideSection[];
}

export async function getGuide(d1: D1Database, locale: string): Promise<GuideData> {
	const db = getDb(d1);
	const row = await db
		.select({ body: contentBlock.body })
		.from(contentBlock)
		.where(and(eq(contentBlock.slug, 'guide'), eq(contentBlock.locale, locale)))
		.get();
	if (!row) throw new Error(`Content not found: guide/${locale}`);

	const { frontmatter, content } = parseFrontmatter(row.body);

	const lines = content.split('\n');
	const introLines: string[] = [];
	const sections: { title: string; cards: { number: string; title: string; body: string[] }[] }[] =
		[];
	let currentSection: (typeof sections)[number] | null = null;
	let currentCard: { number: string; title: string; body: string[] } | null = null;

	for (const line of lines) {
		const h2 = line.match(/^##\s+(.+?)\s*$/);
		const h3 = line.match(/^###\s+(.+?)\s*$/);

		if (h2) {
			currentSection = { title: h2[1], cards: [] };
			sections.push(currentSection);
			currentCard = null;
			continue;
		}

		if (h3 && currentSection) {
			const numbered = h3[1].match(/^(\d+)\.\s*(.+)$/);
			currentCard = numbered
				? { number: numbered[1], title: numbered[2], body: [] }
				: { number: '', title: h3[1], body: [] };
			currentSection.cards.push(currentCard);
			continue;
		}

		if (currentCard) {
			currentCard.body.push(line);
		} else if (!currentSection) {
			introLines.push(line);
		}
	}

	const introHtml = await marked(introLines.join('\n').trim());
	const rendered: GuideSection[] = await Promise.all(
		sections.map(async (s, si) => ({
			title: s.title,
			cards: await Promise.all(
				s.cards.map(async (c, ci) => ({
					id: `${si}-${ci}`,
					number: c.number,
					title: c.title,
					bodyHtml: await marked(c.body.join('\n').trim())
				}))
			)
		}))
	);

	return { frontmatter, introHtml, sections: rendered };
}
