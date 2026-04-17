import { getContent } from '$lib/server/content';
import { getLocale } from '$lib/paraglide/runtime';

export function load() {
	const locale = getLocale();
	const { frontmatter, html } = getContent('about', locale);

	return { frontmatter, html };
}
