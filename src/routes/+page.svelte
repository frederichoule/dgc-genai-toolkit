<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ExploreCard from '$lib/components/ExploreCard.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import bestpracticesIcon from '$lib/icons/bestpractices.svg';
	import calculatorIcon from '$lib/icons/calculator.svg';
	import factsheetIcon from '$lib/icons/factsheet.svg';
	import { m } from '$lib/paraglide/messages.js';
</script>

<svelte:head><title>{m.title_home()}</title></svelte:head>

<section class="py-16">
	<FeatureCard
		title="Understand, measure, and reduce the environmental impact of AI in film and television production"
		image="/images/hero-filmset.jpg"
		imageAlt="Film set with crew and equipment"
	>
		<p>
			Generative AI is becoming part of everyday workflows, from pre-production and editing to
			visual effects and post-production. These tools rely on energy-intensive infrastructure with a
			real environmental footprint that often remains invisible to creators.
		</p>
		<p class="mt-4">
			This toolkit helps make that impact visible and supports more informed decisions in your work.
		</p>
		{#snippet actions()}
			<Button variant="white" arrow href="/calculator" fullWidth>Estimate your GenAI footprint</Button>
			<Button variant="outline" arrow href="/guide" fullWidth>Explore the Best Practices</Button>
		{/snippet}
	</FeatureCard>
</section>

<section class="py-16">
	<SectionIntro title="How to use this toolkit">
		<p>
			This toolkit is designed as a simple decision-support tool for understanding and reducing the
			impact of generative AI in your workflows.
		</p>
	</SectionIntro>
</section>

<section class="py-16">
	<div class="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
		<div class="flex max-w-xs flex-col items-start text-left">
			<img src={factsheetIcon} alt="" class="mb-10 h-20 w-auto" />
			<h3 class="mb-1 text-xl font-medium text-text-primary">{m.howto_facts_title()}</h3>
			<p class="text-lg text-text-tertiary">{m.howto_facts_description()}</p>
		</div>
		<div class="flex max-w-xs flex-col items-start text-left">
			<img src={bestpracticesIcon} alt="" class="mb-10 h-20 w-auto" />
			<h3 class="mb-1 text-xl font-medium text-text-primary">{m.howto_practices_title()}</h3>
			<p class="text-lg text-text-tertiary">{m.howto_practices_description()}</p>
		</div>
		<div class="flex max-w-xs flex-col items-start text-left">
			<img src={calculatorIcon} alt="" class="mb-10 h-20 w-auto" />
			<h3 class="mb-1 text-xl font-medium text-text-primary">{m.howto_calculator_title()}</h3>
			<p class="text-lg text-text-tertiary">{m.howto_calculator_description()}</p>
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
