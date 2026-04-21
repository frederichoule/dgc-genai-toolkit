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

export const marked = new Marked({ gfm: true });
marked.use({ extensions: [underline] });
