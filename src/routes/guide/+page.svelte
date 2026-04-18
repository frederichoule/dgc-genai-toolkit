<script lang="ts">
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import GuideAccordion from '$lib/components/GuideAccordion.svelte';
	import { m } from '$lib/paraglide/messages.js';

	let { data } = $props();
</script>

<svelte:head><title>{m.title_guide()}</title></svelte:head>

<SectionIntro
	eyebrow={data.frontmatter.eyebrow}
	title={data.frontmatter.title}
	as="h1"
	ratio="stacked"
	class="pt-16"
>
	<div class="markdown prose-xl prose-p:text-text-secondary">
		{@html data.introHtml}
	</div>
</SectionIntro>

<GuideAccordion sections={data.sections} />

<section
	class="mt-20 grid grid-cols-1 gap-8 border border-text-tertiary/20 bg-background-soft px-8 py-20 md:grid-cols-12 md:gap-12 md:px-12 md:py-32"
>
	<div class="space-y-4 md:col-span-7 md:col-start-3">
		<h2 class="text-xl font-normal text-text-secondary">{data.note.frontmatter.title}</h2>
		<div class="markdown text-text-tertiary">
			{@html data.note.html}
		</div>
	</div>
</section>
