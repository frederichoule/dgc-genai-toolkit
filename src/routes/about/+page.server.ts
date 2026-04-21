import { getContent } from '$lib/server/content';
import { getLocale } from '$lib/paraglide/runtime';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const { frontmatter, html } = await getContent(platform!.env, 'about', getLocale());
	return { frontmatter, html };
};
