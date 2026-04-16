<script lang="ts">
	import type { Component, ComponentType, SvelteComponent } from 'svelte';

	type Color = 'lime' | 'mint' | 'spring' | 'forest';
	type IconComponent = Component<any> | ComponentType<SvelteComponent<any>>;

	interface Props {
		label: string;
		icon?: IconComponent;
		color: Color;
		selected: boolean;
		idle?: boolean;
		onclick?: () => void;
	}

	let { label, icon: Icon, color, selected, idle = false, onclick }: Props = $props();

	const colors: Record<Color, string> = {
		lime: 'bg-brand-lime',
		mint: 'bg-brand-mint',
		spring: 'bg-brand-spring',
		forest: 'bg-brand-forest'
	};

	let classes = $derived(
		[
			'inline-flex items-center gap-2.5 rounded-full px-5 py-2.5',
			'text-lg font-medium text-background transition-opacity',
			'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
			'focus-visible:ring-offset-background focus-visible:ring-brand-lime',
			colors[color],
			selected
				? idle
					? 'opacity-80 hover:opacity-100 transition-opacity duration-300'
					: 'opacity-100'
				: 'opacity-20 hover:opacity-40'
		].join(' ')
	);
</script>

<button type="button" class={classes} aria-pressed={selected} {onclick}>
	{#if Icon}
		<Icon class="size-5" strokeWidth={1.75} aria-hidden="true" />
	{/if}
	<span>{label}</span>
</button>
