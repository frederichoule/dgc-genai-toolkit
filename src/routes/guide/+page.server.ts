import { getGuide } from '$lib/server/guide';
import { getContent } from '$lib/server/content';
import { getLocale } from '$lib/paraglide/runtime';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const locale = getLocale();
	const [guide, note] = await Promise.all([
		getGuide(platform!.env, locale),
		getContent(platform!.env, 'guide-note', locale)
	]);
	return { ...guide, note };
};
