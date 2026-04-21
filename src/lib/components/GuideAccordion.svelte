<script lang="ts">
	import AccordionCard from '$lib/components/AccordionCard.svelte';
	import type { GuideSection } from '$lib/server/guide';

	interface Props {
		sections: GuideSection[];
		plain?: boolean;
	}

	let { sections, plain = false }: Props = $props();

	const colors = ['mint', 'lime', 'spring'] as const;
	type Color = (typeof colors)[number];

	const titleText: Record<Color, string> = {
		mint: 'text-brand-mint',
		lime: 'text-brand-lime',
		spring: 'text-brand-spring'
	};

	let openId = $state<string | null>(null);

	function colorFor(index: number): Color {
		return colors[index % colors.length];
	}
</script>

<div class="flex flex-col gap-16 pt-20">
	{#each sections as section, si (section.title)}
		{@const color = colorFor(si)}
		<section class="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
			<h2
				class="text-2xl font-normal tracking-tight sm:text-3xl md:col-span-4 {plain
					? 'text-text-primary'
					: titleText[color]}"
			>
				{section.title}
			</h2>
			<div class="flex flex-col gap-3 md:col-span-8">
				{#each section.cards as card (card.id)}
					<AccordionCard
						number={card.number}
						title={card.title}
						bodyHtml={card.bodyHtml}
						{color}
						{plain}
						open={openId === card.id}
						onToggle={() => (openId = openId === card.id ? null : card.id)}
					/>
				{/each}
			</div>
		</section>
	{/each}
</div>
