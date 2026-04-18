import { getGlossary } from '$lib/server/glossary';
import { getLocale } from '$lib/paraglide/runtime';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	return await getGlossary(platform!.env.DB, getLocale());
};
