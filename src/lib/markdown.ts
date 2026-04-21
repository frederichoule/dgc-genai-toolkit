import { Marked, type TokenizerAndRendererExtension } from 'marked';

const underline: TokenizerAndRendererExtension = {
	name: 'underline',
	level: 'inline',
	start(src) {
		return src.indexOf('==');
	},
	tokenizer(src) {
		const match = /^==(?=\S)([\s\S]*?\S)==/.exec(src);
		if (!match) return;
		return {
			type: 'underline',
			raw: match[0],
			tokens: this.lexer.inlineTokens(match[1])
		};
	},
	renderer(token) {
		return `<u>${this.parser.parseInline(token.tokens ?? [])}</u>`;
	}
};

const externalIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="ml-1 inline-block size-[0.9em] align-[-0.1em]"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/></svg>`;

export const marked = new Marked({ gfm: true });
marked.use({
	extensions: [underline],
	renderer: {
		link(token) {
			const text = this.parser.parseInline(token.tokens);
			const isExternal = /^https?:\/\//.test(token.href);
			const titleAttr = token.title ? ` title="${token.title}"` : '';
			const targetAttr = isExternal ? ' target="_blank"' : '';
			const icon = isExternal ? externalIcon : '';
			return `<a href="${token.href}"${titleAttr}${targetAttr}>${text}${icon}</a>`;
		}
	}
});
