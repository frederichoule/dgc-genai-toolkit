<script lang="ts">
	import { Info } from 'lucide-svelte';

	interface Props {
		content: string;
		label?: string;
	}

	let { content, label = 'More information' }: Props = $props();

	let open = $state(false);
	let triggerEl: HTMLButtonElement | undefined = $state();
	let bubbleEl: HTMLDivElement | undefined = $state();

	function toggle() {
		open = !open;
	}

	function handleClickOutside(e: MouseEvent) {
		if (!open) return;
		const target = e.target as Node;
		if (!triggerEl?.contains(target) && !bubbleEl?.contains(target)) {
			open = false;
		}
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) {
			open = false;
			triggerEl?.focus();
		}
	}

	$effect(() => {
		if (!open) return;
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', handleKey);
		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', handleKey);
		};
	});
</script>

<span class="relative inline-flex items-center align-middle">
	<button
		bind:this={triggerEl}
		type="button"
		aria-label={label}
		aria-expanded={open}
		onclick={toggle}
		class="inline-flex items-center justify-center rounded-full text-text-tertiary transition-colors hover:text-text-primary focus-visible:ring-2 focus-visible:ring-brand-lime focus-visible:outline-none"
	>
		<Info size={16} strokeWidth={1.75} aria-hidden="true" />
	</button>

	{#if open}
		<div
			bind:this={bubbleEl}
			role="tooltip"
			class="absolute bottom-full left-1/2 z-50 mb-2 w-[min(20rem,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-white/10 bg-background-soft p-4 text-sm text-text-secondary shadow-2xl"
		>
			{content}
			<span
				class="absolute top-full left-1/2 -mt-1.5 h-3 w-3 -translate-x-1/2 rotate-45 border-r border-b border-white/10 bg-background-soft"
			></span>
		</div>
	{/if}
</span>
