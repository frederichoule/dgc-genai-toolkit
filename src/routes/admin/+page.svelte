<script lang="ts">
	import { resolve } from '$app/paths';
	import Button from '$lib/components/Button.svelte';
	import { FileText } from 'lucide-svelte';
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
	</div>

	<div class="pt-4">
		<Button variant="outline" size="sm" href={resolve('/admin/cms')}>Open CMS</Button>
	</div>
</div>
