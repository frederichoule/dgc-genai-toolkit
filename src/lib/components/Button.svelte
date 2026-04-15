<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ArrowRight } from 'lucide-svelte';

	type Variant = 'white' | 'outline';
	type Size = 'sm' | 'md' | 'lg';

	interface Props {
		variant?: Variant;
		size?: Size;
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		fullWidth?: boolean;
		arrow?: boolean;
		icon?: Snippet;
		onclick?: (e: MouseEvent) => void;
		class?: string;
		children: Snippet;
	}

	let {
		variant = 'white',
		size = 'md',
		href,
		type = 'button',
		disabled = false,
		fullWidth = false,
		arrow = false,
		icon,
		onclick,
		class: klass = '',
		children
	}: Props = $props();

	const base =
		'inline-flex items-center justify-between gap-6 font-medium tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-brand-lime disabled:cursor-not-allowed disabled:opacity-60 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-60';

	const sizes: Record<Size, string> = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-6 py-3.5 text-base',
		lg: 'px-8 py-5 text-lg'
	};

	const variants: Record<Variant, string> = {
		white: 'bg-white text-black hover:bg-white/90',
		outline:
			'bg-transparent text-text-tertiary border border-white/25 hover:text-text-primary hover:border-white/40'
	};

	const iconSize: Record<Size, string> = {
		sm: 'size-4',
		md: 'size-5',
		lg: 'size-6'
	};

	let classes = $derived(
		[base, sizes[size], variants[variant], fullWidth && 'w-full', klass]
			.filter(Boolean)
			.join(' ')
	);
</script>

{#snippet trailing()}
	{#if icon}
		{@render icon()}
	{:else if arrow}
		<ArrowRight class={iconSize[size]} strokeWidth={1.75} aria-hidden="true" />
	{/if}
{/snippet}

{#if href}
	<a
		{href}
		class={classes}
		aria-disabled={disabled || undefined}
		tabindex={disabled ? -1 : undefined}
		{onclick}
	>
		<span>{@render children()}</span>
		{@render trailing()}
	</a>
{:else}
	<button {type} {disabled} class={classes} {onclick}>
		<span>{@render children()}</span>
		{@render trailing()}
	</button>
{/if}
