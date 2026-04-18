<script lang="ts">
	import { resolve } from '$app/paths';
	import Button from '$lib/components/Button.svelte';

	let { data } = $props();
</script>

<svelte:head><title>CMS | Admin | DGC Green</title></svelte:head>

<div class="space-y-8">
	<div>
		<p class="text-sm tracking-wide text-text-tertiary uppercase">CMS</p>
		<h1 class="mt-2 text-3xl font-semibold text-text-primary">Content blocks</h1>
		<p class="mt-2 text-sm text-text-tertiary">
			Edit markdown content blocks shown across the site.
		</p>
	</div>

	{#if data.entries.length === 0}
		<div class="border border-white/15 bg-background-soft p-8 text-center">
			<p class="text-sm text-text-tertiary">
				No content blocks found. Run <code class="text-text-primary">pnpm db:seed-content</code>
				to seed from the <code class="text-text-primary">content/</code> directory.
			</p>
		</div>
	{:else}
		<div class="divide-y divide-white/10 border border-white/15 bg-background-soft">
			{#each data.entries as entry (entry.slug)}
				<div class="flex items-center justify-between gap-4 p-5">
					<div>
						<p class="font-mono text-base font-semibold text-text-primary">{entry.slug}</p>
						<p class="mt-1 text-xs text-text-tertiary">
							{entry.locales.length} locale{entry.locales.length === 1 ? '' : 's'}
						</p>
					</div>
					<Button
						variant="outline"
						size="sm"
						href={resolve('/admin/cms/[slug]', { slug: entry.slug })}
					>
						Edit
					</Button>
				</div>
			{/each}
		</div>
	{/if}
</div>
