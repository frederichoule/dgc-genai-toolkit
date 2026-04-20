import { getContent } from '$lib/server/content';
import { getLocale } from '$lib/paraglide/runtime';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const locale = getLocale();
	const { frontmatter, html } = await getContent(platform!.env.DB, 'facts', locale);
	return { frontmatter, html, locale };
};
