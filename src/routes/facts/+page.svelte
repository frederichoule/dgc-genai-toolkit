<script lang="ts">
	import { Download } from 'lucide-svelte';
	import Button from '$lib/components/Button.svelte';
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import { m } from '$lib/paraglide/messages.js';

	import audioEn from '$lib/assets/facts/en/audio.svg';
	import brazilEn from '$lib/assets/facts/en/brazil.svg';
	import canadianHouseholdEn from '$lib/assets/facts/en/canadian-household.svg';
	import countriesEn from '$lib/assets/facts/en/countries.svg';
	import doubleEn from '$lib/assets/facts/en/double.svg';
	import halfLiterEn from '$lib/assets/facts/en/half-liter.svg';
	import imgEn from '$lib/assets/facts/en/img.svg';
	import ledEn from '$lib/assets/facts/en/led.svg';
	import longDocEn from '$lib/assets/facts/en/long-doc.svg';
	import nycEn from '$lib/assets/facts/en/nyc.svg';
	import textEn from '$lib/assets/facts/en/text.svg';
	import videoEn from '$lib/assets/facts/en/video.svg';

	import audioFr from '$lib/assets/facts/fr/audio.svg';
	import brazilFr from '$lib/assets/facts/fr/brazil.svg';
	import canadianHouseholdFr from '$lib/assets/facts/fr/canadian-household.svg';
	import countriesFr from '$lib/assets/facts/fr/countries.svg';
	import doubleFr from '$lib/assets/facts/fr/double.svg';
	import halfLiterFr from '$lib/assets/facts/fr/half-liter.svg';
	import imgFr from '$lib/assets/facts/fr/img.svg';
	import ledFr from '$lib/assets/facts/fr/led.svg';
	import longDocFr from '$lib/assets/facts/fr/long-doc.svg';
	import nycFr from '$lib/assets/facts/fr/nyc.svg';
	import textFr from '$lib/assets/facts/fr/text.svg';
	import videoFr from '$lib/assets/facts/fr/video.svg';

	type FactKey =
		| 'text'
		| 'long-doc'
		| 'img'
		| 'audio'
		| 'video'
		| 'nyc'
		| 'canadian-household'
		| 'double'
		| 'half-liter'
		| 'led'
		| 'countries'
		| 'brazil';

	const assets: Record<'en' | 'fr', Record<FactKey, string>> = {
		en: {
			text: textEn,
			'long-doc': longDocEn,
			img: imgEn,
			audio: audioEn,
			video: videoEn,
			nyc: nycEn,
			'canadian-household': canadianHouseholdEn,
			double: doubleEn,
			'half-liter': halfLiterEn,
			led: ledEn,
			countries: countriesEn,
			brazil: brazilEn
		},
		fr: {
			text: textFr,
			'long-doc': longDocFr,
			img: imgFr,
			audio: audioFr,
			video: videoFr,
			nyc: nycFr,
			'canadian-household': canadianHouseholdFr,
			double: doubleFr,
			'half-liter': halfLiterFr,
			led: ledFr,
			countries: countriesFr,
			brazil: brazilFr
		}
	};

	const leftKeys: FactKey[] = ['text', 'long-doc', 'img', 'audio', 'video'];

	// SVG aspect ratios (w / h) — used both for proportional flex sizing of
	// paired rows and for computing the optimal left/right column ratio.
	const ASPECT: Record<FactKey, number> = {
		text: 424 / 250,
		'long-doc': 424 / 622,
		img: 424 / 261,
		audio: 424 / 326,
		video: 424 / 346,
		nyc: 1175 / 510,
		'canadian-household': 643 / 780,
		double: 518 / 779,
		'half-liter': 345 / 541,
		led: 815 / 542,
		countries: 1000 / 375,
		brazil: 600 / 375
	};

	const upperRightRows: { key: FactKey; grow: number }[][] = [
		[{ key: 'nyc', grow: ASPECT.nyc }],
		[
			{ key: 'canadian-household', grow: ASPECT['canadian-household'] },
			{ key: 'double', grow: ASPECT.double }
		],
		[
			{ key: 'half-liter', grow: ASPECT['half-liter'] },
			{ key: 'led', grow: ASPECT.led }
		]
	];

	const bottomRow: { key: FactKey; grow: number }[] = [
		{ key: 'countries', grow: ASPECT.countries },
		{ key: 'brazil', grow: ASPECT.brazil }
	];

	// Column-width solver. Left has 5 stacked items (4 internal gaps); right
	// has 3 rows with 2 internal gaps plus horizontal gaps inside each paired
	// row. Solving H_L = H_R for L given container width W:
	const GAP = 16;
	const ALPHA = leftKeys.reduce((s, k) => s + 1 / ASPECT[k], 0);
	const BETA_ROW1 = 1 / ASPECT.nyc;
	const BETA_ROW2 = 1 / (ASPECT['canadian-household'] + ASPECT.double);
	const BETA_ROW3 = 1 / (ASPECT['half-liter'] + ASPECT.led);
	const BETA = BETA_ROW1 + BETA_ROW2 + BETA_ROW3;
	const LEFT_GAP_TOTAL = 4 * GAP;
	const RIGHT_GAP_TOTAL = 2 * GAP - GAP * (BETA_ROW2 + BETA_ROW3);

	function computeLeftWidth(W: number): number {
		return (BETA * (W - GAP) + RIGHT_GAP_TOTAL - LEFT_GAP_TOTAL) / (ALPHA + BETA);
	}

	let gridTemplate: string | undefined = $state();

	function solveGridTemplate(el: HTMLElement) {
		const update = () => {
			if (!window.matchMedia('(min-width: 1024px)').matches) {
				gridTemplate = undefined;
				return;
			}
			const W = el.clientWidth;
			const L = computeLeftWidth(W);
			gridTemplate = `${L}px ${W - GAP - L}px`;
		};
		update();
		const ro = new ResizeObserver(update);
		ro.observe(el);
		window.addEventListener('resize', update);
		return () => {
			ro.disconnect();
			window.removeEventListener('resize', update);
		};
	}

	let { data } = $props();

	const currentAssets = $derived(assets[data.locale as 'en' | 'fr']);
</script>

<svelte:head><title>{m.title_facts()}</title></svelte:head>

<SectionIntro
	eyebrow={data.frontmatter.eyebrow}
	title={data.frontmatter.title}
	as="h1"
	ratio="stacked"
	class="pt-16"
>
	<div class="markdown prose-xl prose-p:text-text-secondary">
		{@html data.html}
	</div>

	<div class="pt-6">
		<Button variant="white" size="md">
			{#snippet icon()}
				<Download class="size-5" strokeWidth={1.75} aria-hidden="true" />
			{/snippet}
			Download in PDF format <span class="text-sm">(XX Mo)</span>
		</Button>
	</div>
</SectionIntro>

<section class="pt-16">
	<div class="flex flex-col gap-4">
		<div
			{@attach solveGridTemplate}
			class="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.812fr)]"
			style:grid-template-columns={gridTemplate}
		>
			<div class="flex flex-col gap-4">
				{#each leftKeys as key (key)}
					<img src={currentAssets[key]} alt="" class="h-auto w-full" />
				{/each}
			</div>
			<div class="flex flex-col gap-4">
				{#each upperRightRows as row, i (i)}
					{#if row.length === 1}
						<img src={currentAssets[row[0].key]} alt="" class="h-auto w-full" />
					{:else}
						<div class="flex flex-col gap-4 lg:flex-row">
							{#each row as cell (cell.key)}
								<img
									src={currentAssets[cell.key]}
									alt=""
									class="h-auto w-full min-w-0 lg:w-auto"
									style="flex: {cell.grow} 1 0"
								/>
							{/each}
						</div>
					{/if}
				{/each}
			</div>
		</div>
		<div class="flex flex-col gap-4 lg:flex-row">
			{#each bottomRow as cell (cell.key)}
				<img
					src={currentAssets[cell.key]}
					alt=""
					class="h-auto w-full min-w-0 lg:w-auto"
					style="flex: {cell.grow} 1 0"
				/>
			{/each}
		</div>
	</div>
</section>
