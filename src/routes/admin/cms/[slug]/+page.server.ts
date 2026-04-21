import { error, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { getDb } from '$lib/server/db';
import { contentBlock } from '$lib/server/db/schema';
import { invalidate } from '$lib/server/cache';
import type { Actions, PageServerLoad } from './$types';

const LOCALES = ['en', 'fr'] as const;
type Locale = (typeof LOCALES)[number];

const MAX_BODY_CHARS = 500_000;

const bodyField = z
	.string({ error: 'Body is required' })
	.max(MAX_BODY_CHARS, { error: `Body exceeds ${MAX_BODY_CHARS.toLocaleString()} characters` });

const cmsFormSchema = z.object({
	body_en: bodyField,
	body_fr: bodyField
});

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
		const parsed = cmsFormSchema.safeParse({
			body_en: form.get('body_en'),
			body_fr: form.get('body_fr')
		});

		if (!parsed.success) {
			return fail(400, { errors: z.flattenError(parsed.error).fieldErrors });
		}

		const db = getDb(platform!.env.DB);
		const kv = platform!.env.CACHE;
		const now = new Date();

		for (const locale of LOCALES) {
			const body = parsed.data[`body_${locale}`];

			await db
				.insert(contentBlock)
				.values({ slug: params.slug!, locale, body, updatedAt: now })
				.onConflictDoUpdate({
					target: [contentBlock.slug, contentBlock.locale],
					set: { body, updatedAt: now }
				});

			await invalidate(kv, `content:${params.slug}:${locale}`);
			if (params.slug === 'glossary') await invalidate(kv, `glossary:${locale}`);
			if (params.slug === 'guide') await invalidate(kv, `guide:${locale}`);
			if (params.slug === 'faq') await invalidate(kv, `faq:${locale}`);
		}

		return { saved: true };
	}
};
