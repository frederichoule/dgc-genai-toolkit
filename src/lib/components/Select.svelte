<script lang="ts">
	interface Option {
		value: string;
		label: string;
	}

	interface Props {
		label: string;
		id: string;
		value: string;
		options: Option[];
	}

	let { label, id, value = $bindable(), options }: Props = $props();
</script>

<div class="space-y-2">
	<label for={id} class="block text-sm text-text-tertiary">{label}</label>
	<select
		{id}
		bind:value
		class="w-full rounded-md border border-white/15 bg-transparent px-4 py-3.5 pr-10 text-text-primary focus:border-brand-lime focus:outline-none focus:ring-0"
	>
		{#each options as option (option.value)}
			<option value={option.value} class="bg-background text-text-primary">
				{option.label}
			</option>
		{/each}
	</select>
</div>
