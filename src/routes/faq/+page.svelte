<script lang="ts">
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import GuideAccordion from '$lib/components/GuideAccordion.svelte';
	import { m } from '$lib/paraglide/messages.js';

	let { data } = $props();
</script>

<svelte:head><title>{m.title_faq()}</title></svelte:head>

<SectionIntro
	eyebrow={data.frontmatter.eyebrow}
	title={data.frontmatter.title}
	as="h1"
	ratio="stacked"
	class="pt-16"
>
	{#if data.introHtml}
		<div class="markdown prose-xl prose-p:text-text-secondary">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html data.introHtml}
		</div>
	{/if}
</SectionIntro>

<GuideAccordion sections={data.sections} plain />
