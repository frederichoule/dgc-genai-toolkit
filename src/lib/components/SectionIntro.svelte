<script lang="ts">
	import type { Snippet } from 'svelte';

	type Ratio = 'thirds' | 'half' | 'quarter';
	type HeadingLevel = 'h2' | 'h3';

	interface Props {
		title: string;
		eyebrow?: string;
		ratio?: Ratio;
		as?: HeadingLevel;
		class?: string;
		children: Snippet;
	}

	let {
		title,
		eyebrow,
		ratio = 'thirds',
		as = 'h2',
		class: klass = '',
		children
	}: Props = $props();

	const titleColumn: Record<Ratio, string> = {
		thirds: 'md:col-span-4',
		half: 'md:col-span-6',
		quarter: 'md:col-span-3'
	};

	const contentColumn: Record<Ratio, string> = {
		thirds: 'md:col-span-8',
		half: 'md:col-span-6',
		quarter: 'md:col-span-9'
	};

	let wrapperClass = $derived(
		['grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12', klass].filter(Boolean).join(' ')
	);

	let titleColClass = $derived(['flex flex-col gap-3', titleColumn[ratio]].join(' '));
	let contentColClass = $derived(
		['space-y-4 text-lg leading-relaxed text-text-tertiary', contentColumn[ratio]].join(' ')
	);
</script>

<section class={wrapperClass}>
	<div class={titleColClass}>
		{#if eyebrow}
			<span class="text-xs uppercase tracking-[0.18em] text-text-tertiary">
				{eyebrow}
			</span>
		{/if}

		{#if as === 'h3'}
			<h3 class="text-2xl font-normal tracking-tight text-text-primary sm:text-3xl">
				{title}
			</h3>
		{:else}
			<h2 class="text-2xl font-normal tracking-tight text-text-primary sm:text-3xl">
				{title}
			</h2>
		{/if}
	</div>

	<div class={contentColClass}>
		{@render children()}
	</div>
</section>
