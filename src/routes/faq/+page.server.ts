import { getFaq } from '$lib/server/faq';
import { getLocale } from '$lib/paraglide/runtime';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const { frontmatter, introHtml, sections } = await getFaq(platform!.env, getLocale());
	return { frontmatter, introHtml, sections };
};
