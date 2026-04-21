<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ExploreCard from '$lib/components/ExploreCard.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import bestpracticesIcon from '$lib/icons/bestpractices.svg';
	import calculatorIcon from '$lib/icons/calculator.svg';
	import factsheetIcon from '$lib/icons/factsheet.svg';
	import { m } from '$lib/paraglide/messages.js';

	let { data } = $props();
	let fm = $derived(data.frontmatter);
</script>

<svelte:head><title>{m.title_home()}</title></svelte:head>

<section class="py-16">
	<FeatureCard
		title={fm.hero_title}
		image="/images/hero-filmset.jpg"
		imageAlt="Film set with crew and equipment"
	>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<div class="markdown">{@html data.html}</div>
		{#snippet actions()}
			<Button variant="white" arrow href="/calculator" fullWidth>
				{m.hero_cta_calculator()}
			</Button>
			<Button variant="outline" arrow href="/guide" fullWidth>
				{m.hero_cta_guide()}
			</Button>
		{/snippet}
	</FeatureCard>
</section>

<section class="py-16">
	<SectionIntro title={fm.howto_title}>
		<p>{fm.howto_intro}</p>
	</SectionIntro>
</section>

<section class="py-16">
	<div class="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
		<div class="flex max-w-xs flex-col items-start text-left">
			<img src={factsheetIcon} alt="" class="mb-10 h-20 w-auto" />
			<h3 class="mb-1 text-xl font-medium text-text-primary">{fm.howto_facts_title}</h3>
			<p class="text-lg text-text-tertiary">{fm.howto_facts_description}</p>
		</div>
		<div class="flex max-w-xs flex-col items-start text-left">
			<img src={bestpracticesIcon} alt="" class="mb-10 h-20 w-auto" />
			<h3 class="mb-1 text-xl font-medium text-text-primary">{fm.howto_practices_title}</h3>
			<p class="text-lg text-text-tertiary">{fm.howto_practices_description}</p>
		</div>
		<div class="flex max-w-xs flex-col items-start text-left">
			<img src={calculatorIcon} alt="" class="mb-10 h-20 w-auto" />
			<h3 class="mb-1 text-xl font-medium text-text-primary">{fm.howto_calculator_title}</h3>
			<p class="text-lg text-text-tertiary">{fm.howto_calculator_description}</p>
		</div>
	</div>
</section>

<section class="pt-16">
	<h2 class="mb-8 text-3xl tracking-tight text-text-primary sm:text-4xl">
		{m.explore_title()}
	</h2>
	<div class="flex flex-col gap-8">
		<ExploreCard
			title={m.explore_facts_title()}
			description={m.explore_facts_description()}
			href="/facts"
			bg="bg-brand-lime"
			image="/images/explore-facts.jpg"
		/>
		<ExploreCard
			title={m.explore_practices_title()}
			description={m.explore_practices_description()}
			href="/guide"
			bg="bg-brand-mint"
			image="/images/explore-practices.jpg"
		/>
		<ExploreCard
			title={m.explore_calculator_title()}
			description={m.explore_calculator_description()}
			href="/calculator"
			bg="bg-brand-spring"
			image="/images/explore-calculator.jpg"
		/>
	</div>
</section>
