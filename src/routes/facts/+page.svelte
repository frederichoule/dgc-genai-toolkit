<script lang="ts">
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import { m } from '$lib/paraglide/messages.js';

	let { data } = $props();
</script>

<svelte:head><title>{m.title_facts()}</title></svelte:head>

<SectionIntro
	eyebrow={data.frontmatter.eyebrow}
	title={data.frontmatter.title}
	as="h1"
	ratio="stacked"
	class="pt-16"
>
	<div class="markdown prose-xl prose-p:text-text-secondary">
		{@html data.html}
	</div>
</SectionIntro>
