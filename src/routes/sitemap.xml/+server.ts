import type { RequestHandler } from './$types';

const origin = 'https://genaitoolkit.dgcgreen.ca';
const pages = ['', 'about', 'calculator', 'facts', 'faq', 'glossary', 'guide'];
const locales = ['en', 'fr'] as const;

const buildPath = (locale: string, page: string) => (page ? `/${locale}/${page}` : `/${locale}`);

export const GET: RequestHandler = () => {
	const today = new Date().toISOString().split('T')[0];

	const urlEntries = pages.flatMap((page) =>
		locales.map((locale) => {
			const alternates = locales
				.map(
					(alt) =>
						`    <xhtml:link rel="alternate" hreflang="${alt}" href="${origin}${buildPath(alt, page)}" />`
				)
				.join('\n');
			return `  <url>
    <loc>${origin}${buildPath(locale, page)}</loc>
    <lastmod>${today}</lastmod>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${origin}${buildPath('en', page)}" />
  </url>`;
		})
	);

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
