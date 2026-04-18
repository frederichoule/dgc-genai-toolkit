<script lang="ts">
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import { m } from '$lib/paraglide/messages.js';

	let { data } = $props();
</script>

<svelte:head><title>{m.title_glossary()}</title></svelte:head>

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

<div class="flex flex-col gap-16 pt-20">
	{#each data.entries as entry (entry.id)}
		<section class="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
			<h3 class="text-base leading-7 font-semibold text-text-primary md:col-span-3">
				{entry.title}
			</h3>
			<div
				class="text-base leading-7 text-text-secondary md:col-span-9 [&>p+p]:mt-4 [&>p]:my-0"
			>
				{@html entry.bodyHtml}
			</div>
		</section>
	{/each}
</div>
