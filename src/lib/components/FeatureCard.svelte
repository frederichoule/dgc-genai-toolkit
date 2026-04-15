<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		image: string;
		imageAlt: string;
		class?: string;
		children: Snippet;
		actions?: Snippet;
	}

	let {
		title,
		image,
		imageAlt,
		class: klass = '',
		children,
		actions
	}: Props = $props();

	let wrapperClass = $derived(['flex flex-col gap-10', klass].filter(Boolean).join(' '));
</script>

<article class={wrapperClass}>
	<h2
		class="max-w-4xl text-3xl font-normal tracking-tight text-text-primary sm:text-4xl md:text-5xl"
	>
		{title}
	</h2>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-10">
		<div class="md:col-span-3">
			<img
				src={image}
				alt={imageAlt}
				class="aspect-video w-full object-cover"
				loading="lazy"
				decoding="async"
			/>
		</div>

		<div class="flex flex-col gap-8 md:col-span-2">
			<div class="space-y-4 leading-relaxed text-text-secondary">
				{@render children()}
			</div>

			{#if actions}
				<div class="flex flex-col gap-3">
					{@render actions()}
				</div>
			{/if}
		</div>
	</div>
</article>
