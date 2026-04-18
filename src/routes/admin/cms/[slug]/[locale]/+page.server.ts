import { error, fail } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import { getDb } from '$lib/server/db';
import { contentBlock } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

const LOCALES = new Set(['en', 'fr']);

export const load: PageServerLoad = async ({ platform, params }) => {
	if (!LOCALES.has(params.locale)) throw error(404, 'Unknown locale');

	const db = getDb(platform!.env.DB);
	const row = await db
		.select({ body: contentBlock.body })
		.from(contentBlock)
		.where(and(eq(contentBlock.slug, params.slug), eq(contentBlock.locale, params.locale)))
		.get();

	if (!row) throw error(404, `Content not found: ${params.slug}/${params.locale}`);

	return { slug: params.slug, locale: params.locale, body: row.body };
};

export const actions: Actions = {
	default: async ({ platform, params, request }) => {
		if (!LOCALES.has(params.locale!)) throw error(404, 'Unknown locale');

		const form = await request.formData();
		const body = form.get('body');
		if (typeof body !== 'string') return fail(400, { error: 'Missing body' });

		const db = getDb(platform!.env.DB);
		await db
			.insert(contentBlock)
			.values({ slug: params.slug!, locale: params.locale!, body, updatedAt: new Date() })
			.onConflictDoUpdate({
				target: [contentBlock.slug, contentBlock.locale],
				set: { body, updatedAt: new Date() }
			});

		return { saved: true };
	}
};
