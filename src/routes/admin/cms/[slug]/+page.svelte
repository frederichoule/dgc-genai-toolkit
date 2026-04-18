<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import Button from '$lib/components/Button.svelte';
	import { marked } from 'marked';
	import { ArrowLeft } from 'lucide-svelte';
	import { untrack } from 'svelte';

	let { data, form } = $props();

	let bodyEn = $state(untrack(() => data.bodies.en));
	let bodyFr = $state(untrack(() => data.bodies.fr));
	let saving = $state(false);

	function stripFrontmatter(raw: string): string {
		const match = raw.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
		return match ? match[1] : raw;
	}

	let previewEn = $derived(marked(stripFrontmatter(bodyEn)) as string);
	let previewFr = $derived(marked(stripFrontmatter(bodyFr)) as string);
</script>

<svelte:head><title>{data.slug} | CMS | DGC Green</title></svelte:head>

<div class="space-y-6">
	<div class="flex items-center justify-between gap-4">
		<div class="flex items-center gap-3">
			<a
				href={resolve('/admin/cms')}
				class="inline-flex items-center gap-1 text-sm text-text-tertiary transition-colors hover:text-text-primary"
			>
				<ArrowLeft class="size-4" />
				Back
			</a>
			<span class="text-text-tertiary">/</span>
			<span class="font-mono text-sm text-text-tertiary">{data.slug}</span>
		</div>
		{#if form?.saved}
			<span class="text-sm text-brand-spring">Saved</span>
		{/if}
	</div>

	<h1 class="text-2xl font-semibold text-text-primary">
		<span class="font-mono">{data.slug}</span>
	</h1>

	<form
		method="POST"
		use:enhance={() => {
			saving = true;
			return async ({ update }) => {
				await update({ reset: false });
				saving = false;
			};
		}}
		class="space-y-8"
	>
		<section class="space-y-3">
			<h2 class="text-sm font-semibold tracking-wide text-text-primary uppercase">English</h2>
			<div class="grid gap-4 lg:grid-cols-2">
				<div class="flex flex-col">
					<label for="body_en" class="mb-2 text-xs tracking-wide text-text-tertiary uppercase">
						Markdown
					</label>
					<textarea
						id="body_en"
						name="body_en"
						bind:value={bodyEn}
						spellcheck="false"
						class="h-[60svh] min-h-[400px] border border-white/15 bg-background-soft p-4 font-mono text-sm leading-relaxed text-text-primary focus:border-white/30 focus:outline-none"
					></textarea>
				</div>
				<div class="flex flex-col">
					<span class="mb-2 text-xs tracking-wide text-text-tertiary uppercase">Preview</span>
					<div
						class="markdown h-[60svh] min-h-[400px] overflow-auto border border-white/15 bg-background-soft p-4"
					>
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html previewEn}
					</div>
				</div>
			</div>
		</section>

		<section class="space-y-3">
			<h2 class="text-sm font-semibold tracking-wide text-text-primary uppercase">Français</h2>
			<div class="grid gap-4 lg:grid-cols-2">
				<div class="flex flex-col">
					<label for="body_fr" class="mb-2 text-xs tracking-wide text-text-tertiary uppercase">
						Markdown
					</label>
					<textarea
						id="body_fr"
						name="body_fr"
						bind:value={bodyFr}
						spellcheck="false"
						class="h-[60svh] min-h-[400px] border border-white/15 bg-background-soft p-4 font-mono text-sm leading-relaxed text-text-primary focus:border-white/30 focus:outline-none"
					></textarea>
				</div>
				<div class="flex flex-col">
					<span class="mb-2 text-xs tracking-wide text-text-tertiary uppercase">Preview</span>
					<div
						class="markdown h-[60svh] min-h-[400px] overflow-auto border border-white/15 bg-background-soft p-4"
					>
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html previewFr}
					</div>
				</div>
			</div>
		</section>

		<div class="sticky bottom-4 flex items-center justify-end gap-3">
			<Button variant="white" type="submit" disabled={saving}>
				{saving ? 'Saving…' : 'Save'}
			</Button>
		</div>
	</form>
</div>
