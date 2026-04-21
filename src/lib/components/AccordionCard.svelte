<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';

	type Color = 'mint' | 'lime' | 'spring';

	interface Props {
		number: string;
		title: string;
		bodyHtml: string;
		color: Color;
		open: boolean;
		onToggle: () => void;
		plain?: boolean;
	}

	let { number, title, bodyHtml, color, open, onToggle, plain = false }: Props = $props();

	const badgeBg: Record<Color, string> = {
		mint: 'bg-brand-mint',
		lime: 'bg-brand-lime',
		spring: 'bg-brand-spring'
	};
	const titleText: Record<Color, string> = {
		mint: 'text-brand-mint',
		lime: 'text-brand-lime',
		spring: 'text-brand-spring'
	};
	const borderColor: Record<Color, string> = {
		mint: 'border-brand-mint/40 hover:border-brand-mint/70',
		lime: 'border-brand-lime/40 hover:border-brand-lime/70',
		spring: 'border-brand-spring/40 hover:border-brand-spring/70'
	};
	const divider: Record<Color, string> = {
		mint: 'border-brand-mint/40 group-hover:border-brand-mint/70',
		lime: 'border-brand-lime/40 group-hover:border-brand-lime/70',
		spring: 'border-brand-spring/40 group-hover:border-brand-spring/70'
	};

	const plainBorder = 'border-white/20 hover:border-white/40';
	const plainTitle = 'text-text-primary';
	const plainDivider = 'border-white/20 group-hover:border-white/40';
</script>

<div
	class="group overflow-hidden border {plain ? plainBorder : borderColor[color]} transition-colors"
>
	<button
		type="button"
		class="flex w-full cursor-pointer items-stretch gap-0 text-left"
		aria-expanded={open}
		aria-label={m.guide_toggle_card()}
		onclick={onToggle}
	>
		{#if number && !plain}
			<span
				class="flex aspect-square w-12 shrink-0 items-center justify-center self-start text-lg font-medium text-background {badgeBg[
					color
				]}"
			>
				{number}
			</span>
		{/if}
		<span
			class="flex min-h-12 flex-1 items-center gap-4 px-5 py-2 text-lg leading-snug font-medium {plain
				? plainTitle
				: titleText[color]}"
		>
			<span class="flex-1">{title}</span>
			<span class="shrink-0 text-2xl leading-none" aria-hidden="true">{open ? '−' : '+'}</span>
		</span>
	</button>

	<div
		class="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
		style:grid-template-rows={open ? '1fr' : '0fr'}
	>
		<div class="min-h-0">
			<div
				class="markdown border-t px-5 py-2 text-text-secondary transition-colors {plain
					? plainDivider
					: divider[color]}"
			>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html bodyHtml}
			</div>
		</div>
	</div>
</div>
