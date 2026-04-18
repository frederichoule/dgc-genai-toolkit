<script lang="ts">
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import { m } from '$lib/paraglide/messages.js';

	let { data } = $props();
</script>

<svelte:head><title>{m.title_about()}</title></svelte:head>

<SectionIntro
	eyebrow={data.frontmatter.eyebrow}
	title={data.frontmatter.title}
	as="h1"
	class="pt-16"
>
	{#snippet image()}
		<div class="relative aspect-square overflow-hidden">
			<img
				src="/images/about-hero.jpg"
				alt=""
				class="absolute inset-0 h-full w-full object-cover grayscale"
			/>
			<div class="absolute inset-0 bg-brand-forest opacity-80 mix-blend-multiply"></div>
		</div>
	{/snippet}
	<div class="markdown prose-h2:text-xl prose-h2:font-semibold prose-img:max-w-[200px]">
		{@html data.html}
	</div>
</SectionIntro>
