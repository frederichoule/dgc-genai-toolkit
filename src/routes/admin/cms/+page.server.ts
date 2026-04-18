import { getDb } from '$lib/server/db';
import { contentBlock } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const db = getDb(platform!.env.DB);
	const rows = await db
		.select({ slug: contentBlock.slug, locale: contentBlock.locale })
		.from(contentBlock)
		.all();

	const bySlug = new Map<string, Set<string>>();
	for (const r of rows) {
		if (!bySlug.has(r.slug)) bySlug.set(r.slug, new Set());
		bySlug.get(r.slug)!.add(r.locale);
	}

	const entries = [...bySlug.entries()]
		.map(([slug, localeSet]) => ({ slug, locales: [...localeSet].sort() }))
		.sort((a, b) => a.slug.localeCompare(b.slug));

	return { entries };
};
