<script lang="ts">
	import Tooltip from './Tooltip.svelte';

	interface Option {
		value: string;
		label: string;
	}

	interface Props {
		label: string;
		id: string;
		value: string;
		options: Option[];
		tooltip?: string;
	}

	let { label, id, value = $bindable(), options, tooltip }: Props = $props();
</script>

<div class="space-y-2">
	<label for={id} class="flex items-center gap-1.5 text-sm text-text-tertiary">
		<span>{label}</span>
		{#if tooltip}
			<Tooltip content={tooltip} />
		{/if}
	</label>
	<select
		{id}
		bind:value
		class="w-full rounded-md border border-white/15 bg-transparent px-4 py-3.5 pr-10 text-text-primary focus:border-brand-lime focus:ring-0 focus:outline-none"
	>
		{#each options as option (option.value)}
			<option value={option.value} class="bg-background text-text-primary">
				{option.label}
			</option>
		{/each}
	</select>
</div>
