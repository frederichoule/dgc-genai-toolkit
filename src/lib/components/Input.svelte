<script lang="ts">
	interface Props {
		label: string;
		id: string;
		type?: 'text' | 'number';
		value: number | string;
		min?: number;
		max?: number;
		step?: number;
		placeholder?: string;
	}

	let {
		label,
		id,
		type = 'text',
		value = $bindable(),
		min,
		max,
		step,
		placeholder
	}: Props = $props();
</script>

<div class="space-y-2">
	<label for={id} class="block text-sm text-text-tertiary">{label}</label>
	{#if type === 'number'}
		<input
			{id}
			type="number"
			bind:value
			{min}
			{max}
			{step}
			{placeholder}
			class="w-full rounded-md border border-white/15 bg-transparent px-4 py-3.5 text-text-primary focus:border-brand-lime focus:outline-none focus:ring-0"
		/>
	{:else}
		<input
			{id}
			type="text"
			bind:value
			{placeholder}
			class="w-full rounded-md border border-white/15 bg-transparent px-4 py-3.5 text-text-primary focus:border-brand-lime focus:outline-none focus:ring-0"
		/>
	{/if}
</div>
