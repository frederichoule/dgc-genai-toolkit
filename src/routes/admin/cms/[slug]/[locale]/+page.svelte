<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import Button from '$lib/components/Button.svelte';
	import { marked } from 'marked';
	import { ArrowLeft } from 'lucide-svelte';
	import { untrack } from 'svelte';

	let { data, form } = $props();

	let body = $state(untrack(() => data.body));
	let saving = $state(false);

	function stripFrontmatter(raw: string): string {
		const match = raw.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
		return match ? match[1] : raw;
	}

	let preview = $derived(marked(stripFrontmatter(body)) as string);
</script>

<svelte:head><title>{data.slug} / {data.locale} | CMS | DGC Green</title></svelte:head>

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
			<span class="font-mono text-sm text-text-tertiary">
				{data.slug} / {data.locale}
			</span>
		</div>
		{#if form?.saved}
			<span class="text-sm text-brand-spring">Saved</span>
		{/if}
	</div>

	<h1 class="text-2xl font-semibold text-text-primary">
		<span class="font-mono">{data.slug}</span>
		<span class="text-text-tertiary"> — </span>
		<span>{data.locale.toUpperCase()}</span>
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
		class="space-y-4"
	>
		<div class="grid gap-4 lg:grid-cols-2">
			<div class="flex flex-col">
				<label for="body" class="mb-2 text-xs tracking-wide text-text-tertiary uppercase">
					Markdown
				</label>
				<textarea
					id="body"
					name="body"
					bind:value={body}
					spellcheck="false"
					class="h-[70svh] min-h-[500px] border border-white/15 bg-background-soft p-4 font-mono text-sm leading-relaxed text-text-primary focus:border-white/30 focus:outline-none"
				></textarea>
			</div>

			<div class="flex flex-col">
				<span class="mb-2 text-xs tracking-wide text-text-tertiary uppercase">Preview</span>
				<div
					class="markdown h-[70svh] min-h-[500px] overflow-auto border border-white/15 bg-background-soft p-4"
				>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html preview}
				</div>
			</div>
		</div>

		<div class="flex items-center justify-end gap-3">
			<Button variant="white" type="submit" disabled={saving}>
				{saving ? 'Saving…' : 'Save'}
			</Button>
		</div>
	</form>
</div>
