import { error, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { getDb } from '$lib/server/db';
import { contentBlock } from '$lib/server/db/schema';
import { invalidate } from '$lib/server/cache';
import type { Actions, PageServerLoad } from './$types';

const LOCALES = ['en', 'fr'] as const;
type Locale = (typeof LOCALES)[number];

export const load: PageServerLoad = async ({ platform, params }) => {
	const db = getDb(platform!.env.DB);
	const rows = await db
		.select({ locale: contentBlock.locale, body: contentBlock.body })
		.from(contentBlock)
		.where(eq(contentBlock.slug, params.slug))
		.all();

	if (rows.length === 0) throw error(404, `Content not found: ${params.slug}`);

	const bodies: Record<Locale, string> = { en: '', fr: '' };
	for (const r of rows) {
		if ((LOCALES as readonly string[]).includes(r.locale)) {
			bodies[r.locale as Locale] = r.body;
		}
	}

	return { slug: params.slug, bodies };
};

export const actions: Actions = {
	default: async ({ platform, params, request }) => {
		const form = await request.formData();
		const db = getDb(platform!.env.DB);
		const now = new Date();

		for (const locale of LOCALES) {
			const body = form.get(`body_${locale}`);
			if (typeof body !== 'string') return fail(400, { error: `Missing body_${locale}` });

			await db
				.insert(contentBlock)
				.values({ slug: params.slug!, locale, body, updatedAt: now })
				.onConflictDoUpdate({
					target: [contentBlock.slug, contentBlock.locale],
					set: { body, updatedAt: now }
				});

			invalidate(`content:${params.slug}:${locale}`);
			if (params.slug === 'glossary') invalidate(`glossary:${locale}`);
			if (params.slug === 'guide') invalidate(`guide:${locale}`);
			if (params.slug === 'faq') invalidate(`faq:${locale}`);
		}

		return { saved: true };
	}
};
