import { getGuide } from '$lib/server/guide';
import { getLocale } from '$lib/paraglide/runtime';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	return await getGuide(platform!.env.DB, getLocale());
};
