<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import Button from '$lib/components/Button.svelte';
	import { FileText, Trash2 } from 'lucide-svelte';

	let { form } = $props();
	let clearing = $state(false);
</script>

<svelte:head><title>Admin | DGC Green</title></svelte:head>

<div class="space-y-8">
	<div>
		<p class="text-sm tracking-wide text-text-tertiary uppercase">Admin</p>
		<h1 class="mt-2 text-3xl font-semibold text-text-primary">Dashboard</h1>
	</div>

	<div class="grid gap-4 sm:grid-cols-2">
		<a
			href={resolve('/admin/cms')}
			class="group block border border-white/15 bg-background-soft p-6 transition-colors hover:border-white/30"
		>
			<div class="flex items-start justify-between">
				<div>
					<div class="mb-4 text-text-tertiary transition-colors group-hover:text-text-primary">
						<FileText class="size-6" />
					</div>
					<h2 class="text-lg font-semibold text-text-primary">Content (CMS)</h2>
					<p class="mt-2 text-sm text-text-tertiary">
						Edit markdown content blocks for site pages, per language.
					</p>
				</div>
			</div>
		</a>

		<div class="border border-white/15 bg-background-soft p-6">
			<div class="mb-4 text-text-tertiary">
				<Trash2 class="size-6" />
			</div>
			<h2 class="text-lg font-semibold text-text-primary">Cache</h2>
			<p class="mt-2 text-sm text-text-tertiary">
				Clear the in-memory content cache for this worker isolate. Saves from the CMS already
				invalidate their own keys.
			</p>
			<form
				method="POST"
				action="?/clearCache"
				use:enhance={() => {
					clearing = true;
					return async ({ update }) => {
						await update({ reset: false });
						clearing = false;
					};
				}}
				class="mt-4 flex items-center gap-3"
			>
				<Button variant="outline" size="sm" type="submit" disabled={clearing}>
					{clearing ? 'Clearing…' : 'Clear cache'}
				</Button>
				{#if form?.cleared !== undefined}
					<span class="text-sm text-brand-spring">
						Cleared {form.cleared}
						{form.cleared === 1 ? 'entry' : 'entries'}
					</span>
				{/if}
			</form>
		</div>
	</div>
</div>
