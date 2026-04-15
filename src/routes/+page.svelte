<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import factsheetIcon from '$lib/icons/factsheet.svg';
</script>

<section class="py-16">
	<FeatureCard
		title="Understand, measure, and reduce the environmental impact of AI in film and television production"
		image="https://picsum.photos/seed/filmset/1200/900"
		imageAlt="Film set with crew and equipment"
	>
		<p>
			Generative AI is becoming part of everyday workflows, from pre-production and editing to visual
			effects and post-production. These tools rely on energy-intensive infrastructure with a real
			environmental footprint that often remains invisible to creators.
		</p>
		<p class="mt-4">
			This toolkit helps make that impact visible and supports more informed decisions in your work.
		</p>
		{#snippet actions()}
			<Button variant="white" arrow href="/calculator" fullWidth>Estimate your AI footprint</Button>
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
			<h3 class="mb-1 text-xl font-medium text-text-primary">See the impact</h3>
			<p class="text-lg text-text-tertiary">
				Use the Fact Sheet to see where environmental impacts come from.
			</p>
		</div>
		<div class="flex max-w-xs flex-col items-start text-left">
			<img src={factsheetIcon} alt="" class="mb-10 h-20 w-auto" />
			<h3 class="mb-1 text-xl font-medium text-text-primary">Column 2 title</h3>
			<p class="text-lg text-text-tertiary">Short description for the second column goes here.</p>
		</div>
		<div class="flex max-w-xs flex-col items-start text-left">
			<img src={factsheetIcon} alt="" class="mb-10 h-20 w-auto" />
			<h3 class="mb-1 text-xl font-medium text-text-primary">Column 3 title</h3>
			<p class="text-lg text-text-tertiary">Short description for the third column goes here.</p>
		</div>
	</div>
</section>
