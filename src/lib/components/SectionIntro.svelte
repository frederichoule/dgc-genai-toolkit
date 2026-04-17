<script lang="ts">
	import type { Snippet } from 'svelte';

	type Ratio = 'thirds' | 'half' | 'quarter';
	type HeadingLevel = 'h1' | 'h2' | 'h3';

	interface Props {
		title: string;
		eyebrow?: string;
		ratio?: Ratio;
		as?: HeadingLevel;
		image?: Snippet;
		class?: string;
		children: Snippet;
	}

	let {
		title,
		eyebrow,
		ratio = 'thirds',
		as = 'h2',
		image,
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

	const headingSize: Record<HeadingLevel, string> = {
		h1: 'text-4xl font-normal tracking-tight text-text-primary sm:text-6xl sm:leading-none',
		h2: 'text-2xl font-normal tracking-tight text-text-primary sm:text-3xl',
		h3: 'text-2xl font-normal tracking-tight text-text-primary sm:text-3xl'
	};

	let wrapperClass = $derived(
		['grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12', klass].filter(Boolean).join(' ')
	);

	let titleColClass = $derived(
		['flex flex-col gap-3', image ? 'md:col-span-6' : titleColumn[ratio]].join(' ')
	);
	let contentColClass = $derived(
		[
			'space-y-4 text-lg leading-relaxed text-text-tertiary',
			image ? 'md:col-span-6' : contentColumn[ratio]
		].join(' ')
	);
</script>

{#if image}
	<section class={wrapperClass}>
		<div class="flex flex-col gap-8 md:col-span-6">
			<div class="flex flex-col gap-3">
				{#if eyebrow}
					<span class="text-xs uppercase tracking-[0.18em] text-text-tertiary">
						{eyebrow}
					</span>
				{/if}

				{#if as === 'h3'}
					<h3 class={headingSize.h3}>{title}</h3>
				{:else if as === 'h1'}
					<h1 class={headingSize.h1}>{title}</h1>
				{:else}
					<h2 class={headingSize.h2}>{title}</h2>
				{/if}
			</div>

			<div class="space-y-4 text-lg leading-relaxed text-text-tertiary">
				{@render children()}
			</div>
		</div>

		<div class="hidden md:col-span-6 md:block">
			{@render image()}
		</div>
	</section>
{:else}
	<section class={wrapperClass}>
		<div class={titleColClass}>
			{#if eyebrow}
				<span class="text-xs uppercase tracking-[0.18em] text-text-tertiary">
					{eyebrow}
				</span>
			{/if}

			{#if as === 'h3'}
				<h3 class={headingSize.h3}>{title}</h3>
			{:else if as === 'h1'}
				<h1 class={headingSize.h1}>{title}</h1>
			{:else}
				<h2 class={headingSize.h2}>{title}</h2>
			{/if}
		</div>

		<div class={contentColClass}>
			{@render children()}
		</div>
	</section>
{/if}
