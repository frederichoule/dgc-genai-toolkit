<script lang="ts">
	import { resolve } from '$app/paths';

	let { children } = $props();
</script>

<div class="min-h-svh">
	<header class="border-b border-white/10 bg-background-soft">
		<div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
			<a href={resolve('/admin')} class="flex items-center gap-3">
				<span
					class="inline-flex size-8 items-center justify-center bg-brand-forest text-sm font-bold text-brand-lime"
				>
					D
				</span>
				<span class="text-sm font-semibold tracking-wide text-text-primary">DGC CMS</span>
			</a>
			<a
				href={resolve('/')}
				class="text-sm text-text-tertiary transition-colors hover:text-text-primary"
			>
				Back to site
			</a>
		</div>
	</header>

	<main class="mx-auto max-w-5xl px-6 py-10">
		{@render children()}
	</main>
</div>
