import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: adapter({
			platformProxy: {
				remoteBindings: true
			}
		}),
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				'script-src': ['self', 'https://www.googletagmanager.com'],
				'style-src': ['self', 'unsafe-inline'],
				'img-src': [
					'self',
					'data:',
					'https://www.googletagmanager.com',
					'https://www.google-analytics.com',
					'https://*.google-analytics.com'
				],
				'font-src': ['self'],
				'connect-src': [
					'self',
					'https://www.googletagmanager.com',
					'https://www.google-analytics.com',
					'https://*.google-analytics.com',
					'https://*.analytics.google.com'
				],
				'object-src': ['none'],
				'base-uri': ['self'],
				'form-action': ['self'],
				'frame-ancestors': ['none']
			}
		},
		typescript: {
			config: (config) => ({
				...config,
				include: [...config.include, '../drizzle.config.ts']
			})
		},
		version: {
			pollInterval: 10 * 60 * 1000
		}
	}
};

export default config;
