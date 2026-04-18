<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';
	import LightbulbIcon from '$lib/icons/LightbulbIcon.svelte';
	import PresentationIcon from '$lib/icons/PresentationIcon.svelte';
	import EmailIcon from '$lib/icons/EmailIcon.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import VideoCallIcon from '$lib/icons/VideoCallIcon.svelte';
	import MicrowaveIcon from '$lib/icons/MicrowaveIcon.svelte';
	import AudioIcon from '$lib/icons/AudioIcon.svelte';
	import ImageIcon from '$lib/icons/ImageIcon.svelte';
	import TextIcon from '$lib/icons/TextIcon.svelte';
	import Button from '$lib/components/Button.svelte';
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import Pill from '$lib/components/Pill.svelte';
	import Input from '$lib/components/Input.svelte';
	import Select from '$lib/components/Select.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import {
		calculateText,
		calculateImage,
		calculateVideo,
		calculateAudio,
		co2Equivalences,
		energyEquivalences,
		type Result
	} from '$lib/calculator';
	import { tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import NumberFlow from '@number-flow/svelte';

	type TaskType = 'summary' | 'image' | 'audio' | 'video';
	type TaskColor = 'lime' | 'mint' | 'spring' | 'forest';

	const defaults = {
		pagesToRead: 30,
		useReasoning: '1',
		imageAttempts: 30,
		videoAttempts: 4,
		videoDuration: 8,
		audioAttempts: 30,
		audioDuration: 30,
		textTokensPerPage: 500,
		textOutputPages: 1,
		imageImagesPerIteration: 1,
		videoQuality: 'HD',
		videoFps: 24,
		provider: 'OpenAI'
	};

	let selectedTask = $state<TaskType | null>(null);
	let showAdvanced = $state(false);

	let pagesToRead = $state(defaults.pagesToRead);
	let useReasoning = $state(defaults.useReasoning);
	let imageAttempts = $state(defaults.imageAttempts);
	let videoAttempts = $state(defaults.videoAttempts);
	let videoDuration = $state(defaults.videoDuration);
	let audioAttempts = $state(defaults.audioAttempts);
	let audioDuration = $state(defaults.audioDuration);

	let textTokensPerPage = $state(defaults.textTokensPerPage);
	let textOutputPages = $state(defaults.textOutputPages);
	let imageImagesPerIteration = $state(defaults.imageImagesPerIteration);
	let videoQuality = $state(defaults.videoQuality);
	let videoFps = $state(defaults.videoFps);
	let provider = $state(defaults.provider);

	const providerOptions = [
		{ value: 'OpenAI', label: 'OpenAI' },
		{ value: 'Anthropic', label: 'Anthropic' },
		{ value: 'Google', label: 'Google' },
		{ value: 'Microsoft', label: 'Microsoft' },
		{ value: 'xAI (Grok)', label: 'xAI (Grok)' },
		{ value: 'US Average', label: 'US average grid' },
		{ value: 'Canada Average', label: 'Canada average grid' },
		{ value: 'World Average', label: 'World average grid' }
	];

	const videoQualityOptions = [
		{ value: 'HD', label: 'HD (720×1280)' },
		{ value: 'FHD', label: 'Full HD (1080×1920)' }
	];

	type Snapshot = {
		selectedTask: TaskType | null;
		pagesToRead: number;
		useReasoning: string;
		textTokensPerPage: number;
		textOutputPages: number;
		imageAttempts: number;
		imageImagesPerIteration: number;
		videoAttempts: number;
		videoDuration: number;
		videoQuality: string;
		videoFps: number;
		audioAttempts: number;
		audioDuration: number;
		provider: string;
	};

	function currentSnapshot(): Snapshot {
		return {
			selectedTask,
			pagesToRead,
			useReasoning,
			textTokensPerPage,
			textOutputPages,
			imageAttempts,
			imageImagesPerIteration,
			videoAttempts,
			videoDuration,
			videoQuality,
			videoFps,
			audioAttempts,
			audioDuration,
			provider
		};
	}

	let submitted = $state<{ snapshot: Snapshot; result: Result } | null>(null);

	const result = $derived.by<Result | null>(() => {
		const s = submitted;
		if (!s) return null;
		if (s.snapshot.selectedTask !== selectedTask) return null;
		return s.result;
	});

	function reset() {
		selectedTask = null;
		showAdvanced = false;
		pagesToRead = defaults.pagesToRead;
		useReasoning = defaults.useReasoning;
		imageAttempts = defaults.imageAttempts;
		videoAttempts = defaults.videoAttempts;
		videoDuration = defaults.videoDuration;
		audioAttempts = defaults.audioAttempts;
		audioDuration = defaults.audioDuration;
		textTokensPerPage = defaults.textTokensPerPage;
		textOutputPages = defaults.textOutputPages;
		imageImagesPerIteration = defaults.imageImagesPerIteration;
		videoQuality = defaults.videoQuality;
		videoFps = defaults.videoFps;
		provider = defaults.provider;
		submitted = null;
	}

	let resultsEl = $state<HTMLDivElement | null>(null);

	async function submit() {
		if (!selectedTask) return;
		let computed: Result;
		if (selectedTask === 'summary') {
			computed = calculateText(
				pagesToRead,
				textTokensPerPage,
				useReasoning === '1',
				textOutputPages,
				provider
			);
		} else if (selectedTask === 'image') {
			computed = calculateImage(imageAttempts, imageImagesPerIteration, provider);
		} else if (selectedTask === 'video') {
			computed = calculateVideo(
				videoAttempts,
				videoDuration,
				videoQuality as 'HD' | 'FHD',
				videoFps,
				provider
			);
		} else {
			computed = calculateAudio(audioAttempts, audioDuration, provider);
		}
		submitted = { snapshot: currentSnapshot(), result: computed };
		await tick();
		if (window.matchMedia('(max-width: 1023px)').matches) {
			resultsEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	const tasks = [
		{ id: 'summary', label: 'A text summary', icon: TextIcon, color: 'lime' },
		{ id: 'image', label: 'An image', icon: ImageIcon, color: 'mint' },
		{ id: 'audio', label: 'An audio clip', icon: AudioIcon, color: 'spring' },
		{ id: 'video', label: 'A video clip', icon: PresentationIcon, color: 'forest' }
	] as const;

	const panelColors: Record<TaskColor, { bg: string; text: string }> = {
		lime: { bg: 'bg-brand-lime', text: 'text-brand-lime' },
		mint: { bg: 'bg-brand-mint', text: 'text-brand-mint' },
		spring: { bg: 'bg-brand-spring', text: 'text-brand-spring' },
		forest: { bg: 'bg-brand-forest', text: 'text-brand-forest' }
	};

	const activeColor = $derived<TaskColor>(
		selectedTask ? tasks.find((t) => t.id === selectedTask)!.color : 'mint'
	);

	const co2Factor = (label: string) => co2Equivalences.find((e) => e.label === label)!.factorKg;
	const kwhFactor = (label: string) => energyEquivalences.find((e) => e.label === label)!.factorKwh;

	function fmtOpts(n: number): Intl.NumberFormatOptions {
		if (!isFinite(n) || n < 0) return { maximumFractionDigits: 0 };
		if (n >= 10_000)
			return { notation: 'compact', compactDisplay: 'short', maximumFractionDigits: 1 };
		if (n >= 100) return { maximumFractionDigits: 0 };
		if (n >= 10) return { minimumFractionDigits: 1, maximumFractionDigits: 1 };
		return { minimumFractionDigits: 2, maximumFractionDigits: 2 };
	}

	const grams = $derived(result ? result.totalCo2Kg * 1000 : 0);
	const kwh = $derived(result ? result.totalEnergyKwh : 0);

	const equivalences = $derived([
		{
			icon: SearchIcon,
			value: result ? Math.round(result.totalCo2Kg / co2Factor('Web searches')) : 0,
			unit: '',
			label: 'web searches',
			format: { maximumFractionDigits: 0 } as Intl.NumberFormatOptions
		},
		{
			icon: EmailIcon,
			value: result ? Math.round(result.totalCo2Kg / co2Factor('Emails sent')) : 0,
			unit: '',
			label: 'emails sent',
			format: { maximumFractionDigits: 0 } as Intl.NumberFormatOptions
		},
		{
			icon: PresentationIcon,
			value: result ? (result.totalCo2Kg / co2Factor('Hours of video streaming')) * 60 : 0,
			isTime: true,
			label: 'of streaming'
		},
		{
			icon: VideoCallIcon,
			value: result ? (result.totalCo2Kg / co2Factor('Hours of video conference')) * 60 : 0,
			isTime: true,
			label: 'of video call with 2 people'
		},
		{
			icon: LightbulbIcon,
			value: (kwh / kwhFactor('LED bulb hours')) * 60,
			isTime: true,
			label: 'of LED light'
		},
		{
			icon: MicrowaveIcon,
			value: kwh / kwhFactor('Microwave minutes'),
			isTime: true,
			label: 'of microwave'
		}
	]);

	let displayGrams = $state(0);
	let displayEquivalences = $state<number[]>([0, 0, 0, 0, 0, 0]);

	$effect(() => {
		if (!result) {
			displayGrams = 0;
			displayEquivalences = [0, 0, 0, 0, 0, 0];
			return;
		}
		displayGrams = grams;
		displayEquivalences = equivalences.map((e) => e.value);
	});
</script>

<svelte:head><title>{m.title_calculator()}</title></svelte:head>

<section class="grid grid-cols-1 gap-12 py-16 lg:grid-cols-2">
	<div class="max-w-xl">
		<p class="text-xs tracking-[0.18em] text-text-tertiary uppercase">Emissions calculator</p>
		<h1 class="mt-6 text-5xl font-normal tracking-tight text-text-primary sm:text-6xl">
			What does your AI task cost?
		</h1>

		<div class="mt-12">
			<div class="space-y-4">
				<p class="text-sm text-text-tertiary">Select what you want to generate:</p>
				<div class="flex flex-wrap gap-x-3 gap-y-2">
					{#each tasks as task, i (task.id)}
						<Pill
							label={task.label}
							icon={task.icon}
							color={task.color}
							selected={selectedTask === null || selectedTask === task.id}
							idle={selectedTask === null}
							onclick={() => {
								if (selectedTask === task.id) return;
								selectedTask = task.id;
								showAdvanced = false;
								submitted = null;
							}}
						/>
						{#if i === 1}
							<div class="basis-full"></div>
						{/if}
					{/each}
				</div>
			</div>

			<div
				class="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
				style:grid-template-rows={selectedTask === 'summary' ? '1fr' : '0fr'}
			>
				<div class="min-h-0">
					<div class="space-y-8 pt-8">
						<Input
							id="pages-to-read"
							label="Pages to read"
							type="number"
							min={1}
							bind:value={pagesToRead}
						/>
						<Select
							id="use-reasoning"
							label="Did the model need to use reasoning?"
							tooltip={m.calc_reasoning_tooltip()}
							bind:value={useReasoning}
							options={[
								{ value: '1', label: 'With a reasoning model' },
								{ value: '0', label: 'Without a reasoning model' }
							]}
						/>
					</div>
				</div>
			</div>

			<div
				class="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
				style:grid-template-rows={selectedTask === 'image' ? '1fr' : '0fr'}
			>
				<div class="min-h-0">
					<div class="pt-8">
						<Input
							id="image-attempts"
							label="Attempts / iterations"
							type="number"
							min={1}
							bind:value={imageAttempts}
						/>
					</div>
				</div>
			</div>

			<div
				class="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
				style:grid-template-rows={selectedTask === 'video' ? '1fr' : '0fr'}
			>
				<div class="min-h-0">
					<div class="space-y-8 pt-8">
						<Input
							id="video-attempts"
							label="Attempts / iterations"
							type="number"
							min={1}
							bind:value={videoAttempts}
						/>
						<Input
							id="video-duration"
							label="Duration (seconds)"
							type="number"
							min={1}
							bind:value={videoDuration}
						/>
					</div>
				</div>
			</div>

			<div
				class="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
				style:grid-template-rows={selectedTask === 'audio' ? '1fr' : '0fr'}
			>
				<div class="min-h-0">
					<div class="space-y-8 pt-8">
						<Input
							id="audio-attempts"
							label="Attempts / iterations"
							type="number"
							min={1}
							bind:value={audioAttempts}
						/>
						<Input
							id="audio-duration"
							label="Duration (seconds)"
							type="number"
							min={1}
							bind:value={audioDuration}
						/>
					</div>
				</div>
			</div>

			<div
				class="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
				style:grid-template-rows={selectedTask ? '1fr' : '0fr'}
			>
				<div class="min-h-0">
					<div class="pt-8">
						<button
							type="button"
							onclick={() => (showAdvanced = !showAdvanced)}
							class="flex items-center gap-2 text-sm text-text-tertiary hover:text-text-primary"
						>
							Display advanced mode
							<ChevronDown
								class="size-4 transition-transform duration-300 {showAdvanced ? 'rotate-180' : ''}"
								strokeWidth={1.75}
							/>
						</button>
					</div>
				</div>
			</div>

			<div
				class="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
				style:grid-template-rows={showAdvanced && selectedTask === 'summary' ? '1fr' : '0fr'}
			>
				<div class="min-h-0">
					<div class="space-y-8 pt-8">
						<Input
							id="text-tokens-per-page"
							label="Nombre de tokens par page"
							type="number"
							min={1}
							bind:value={textTokensPerPage}
						/>
						<Input
							id="text-output-pages"
							label="Nombre de pages de sortie"
							type="number"
							min={1}
							bind:value={textOutputPages}
						/>
					</div>
				</div>
			</div>

			<div
				class="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
				style:grid-template-rows={showAdvanced && selectedTask === 'image' ? '1fr' : '0fr'}
			>
				<div class="min-h-0">
					<div class="pt-8">
						<Input
							id="image-per-iteration"
							label="Nombre d'images générées par itération"
							type="number"
							min={1}
							bind:value={imageImagesPerIteration}
						/>
					</div>
				</div>
			</div>

			<div
				class="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
				style:grid-template-rows={showAdvanced && selectedTask === 'video' ? '1fr' : '0fr'}
			>
				<div class="min-h-0">
					<div class="space-y-8 pt-8">
						<Select
							id="video-quality"
							label="Qualité de la vidéo générée"
							bind:value={videoQuality}
							options={videoQualityOptions}
						/>
						<Input
							id="video-fps"
							label="Nombre de frames par seconde (fps)"
							type="number"
							min={1}
							bind:value={videoFps}
						/>
					</div>
				</div>
			</div>

			<div
				class="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
				style:grid-template-rows={showAdvanced && selectedTask ? '1fr' : '0fr'}
			>
				<div class="min-h-0">
					<div class="pt-8">
						<Select
							id="provider"
							label="Fournisseur du service d'IA"
							bind:value={provider}
							options={providerOptions}
						/>
					</div>
				</div>
			</div>

			<div class="pt-8">
				<Button
					variant="white"
					arrow
					fullWidth
					size="lg"
					disabled={selectedTask === null}
					onclick={submit}
				>
					Estimate your GenAI footprint
				</Button>
			</div>

			<div
				class="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
				style:grid-template-rows={selectedTask ? '1fr' : '0fr'}
			>
				<div class="min-h-0">
					<div class="pt-4">
						<Button variant="outline" fullWidth onclick={reset}>Reset</Button>
					</div>
				</div>
			</div>
		</div>
	</div>

	{#if result}
		<div
			bind:this={resultsEl}
			class="w-full scroll-mt-28 lg:sticky lg:top-24 lg:self-start"
			transition:fade={{ duration: 250 }}
		>
			<div
				class="rounded-3xl {panelColors[activeColor].bg} p-5 pb-1 text-background sm:p-6 sm:pb-2"
			>
				<p class="text-sm">Estimated emissions</p>
				<p class="mt-0 flex items-baseline gap-2">
					<span
						class="-mt-[0.3em] -mb-[0.2em] inline-block text-8xl leading-none font-bold tracking-tight sm:text-9xl"
					>
						<NumberFlow value={displayGrams} format={fmtOpts(displayGrams)} />
					</span>
					<span class="-mb-[0.25em] text-2xl font-semibold sm:text-3xl">
						g CO<sub class="text-[0.6em]">2</sub>e
					</span>
				</p>
			</div>

			<p class="mt-10 text-sm {panelColors[activeColor].text}">That's equivalent to...</p>

			<div
				class="mt-6 grid grid-flow-row gap-x-8 gap-y-8 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-3"
			>
				{#each equivalences as item, i (item.label)}
					{@const Icon = item.icon}
					{@const v = displayEquivalences[i] ?? 0}
					<div class="flex items-center gap-5">
						<Icon class="size-14 shrink-0 {panelColors[activeColor].text}" />
						<div class="flex flex-col">
							<p class="flex items-baseline gap-1">
								{#if item.isTime}
									{@const hrs = Math.floor(v / 60)}
									{@const rawMins = Math.round(v % 60)}
									{@const adjustedHrs = rawMins === 60 ? hrs + 1 : hrs}
									{@const mins = rawMins === 60 ? 0 : rawMins}
									{@const showHrs = adjustedHrs > 0}
									{@const displayMins = showHrs ? mins : Math.max(v > 0 ? 1 : 0, Math.round(v))}
									{@const hideMins = showHrs && mins === 0}
									<span
										class="-mb-[0.3em] inline-block text-5xl leading-none font-bold tracking-tight {panelColors[
											activeColor
										].text} {showHrs ? '' : 'sr-only'}"
									>
										<NumberFlow value={adjustedHrs} format={{ maximumFractionDigits: 0 }} />
									</span>
									<span
										class="-mb-[0.25em] text-sm font-semibold {panelColors[activeColor]
											.text} {showHrs ? '' : 'sr-only'}"
									>
										h
									</span>
									<span
										class="-mb-[0.3em] inline-block text-5xl leading-none font-bold tracking-tight {panelColors[
											activeColor
										].text} {hideMins ? 'sr-only' : ''}"
									>
										<NumberFlow value={displayMins} format={{ maximumFractionDigits: 0 }} />
									</span>
									<span
										class="-mb-[0.25em] text-sm font-semibold {panelColors[activeColor]
											.text} {hideMins ? 'sr-only' : ''}"
									>
										min
									</span>
								{:else}
									<span
										class="-mb-[0.3em] inline-block text-5xl leading-none font-bold tracking-tight {panelColors[
											activeColor
										].text}"
									>
										<NumberFlow value={v} format={item.format ?? fmtOpts(v)} />
									</span>
									{#if item.unit}
										<span
											class="-mb-[0.25em] text-sm font-semibold {panelColors[activeColor].text}"
										>
											{item.unit}
										</span>
									{/if}
								{/if}
							</p>
							<p class="mt-0 text-sm font-semibold {panelColors[activeColor].text}">
								{item.label}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</section>

<hr class="border-border" />

<SectionIntro
	eyebrow="About the Calculator methodology"
	title="Estimating environmental impact of Gen AI for different use cases"
	class="py-16"
>
	<p>
		Understanding the impacts of AI and the key parameters that influence them is the first step for
		a more conscious and responsible use of a technology that will shape the coming decades.
	</p>
	<p>
		Although AI may have impacts on many aspects of our society and ecosystems, we focus here
		specifically on environmental impacts, particularly energy use and carbon emissions, as these
		two indicators are intrinsically linked by the energy-carbon transition we agreed to start with
		the Paris Agreement (2015), to hold &ldquo;the increase in the global average temperature to
		well below 2&deg;C above pre-industrial levels&rdquo; and pursue efforts &ldquo;to limit the
		temperature increase to 1.5&deg;C above pre-industrial levels.&rdquo;
	</p>

	<h3 class="!mt-10 text-xl font-semibold text-text-primary">Approach</h3>
	<p>
		We aim to assess and aggregate the environmental impacts of AI services through a usage-based
		approach.
	</p>
	<p>
		We designed this methodology to be transparent, sourced, reproducible, and as representative as
		possible, considering the data and studies available at the time of development (February 2026).
		As this field evolves rapidly, we encourage feedback and continuous improvement of the
		methodology.
	</p>

	<h3 class="!mt-10 text-xl font-semibold text-text-primary">AI Use Cases</h3>
	<p>
		Before estimating impacts, we sought to understand how audiovisual creators integrate AI into
		their work, and what types of systems are used accordingly. Online surveys revealed various use
		cases, which we simplified and grouped into four main categories:
	</p>
	<ul class="list-disc space-y-1 pl-5">
		<li>Read a 100-page PDF and generate a one-page summary</li>
		<li>Generate a 2K photorealistic image from a text prompt (multiple iterations)</li>
		<li>Generate a short HD video from a text prompt</li>
		<li>Generate an audio clip from a text prompt</li>
	</ul>
	<p>These use cases are intended to reflect real creative workflows in the screen industry.</p>

	<h3 class="!mt-10 text-xl font-semibold text-text-primary">Life-Cycle Approach</h3>
	<p>
		To correctly estimate the impact of a web service, every part of the system that enables the
		service to be delivered must be included. The three main typical parts of a digital system are
		users' devices, networks, and data centres. To be exhaustive, either manufacturing or usage must
		be included.
	</p>
	<p>
		The methodology used to estimate the environmental impact of a service is called Life-Cycle
		Assessment (LCA). Described in ISO 14040 and 14044, as well as ITU L.1450.
	</p>
	<p>
		This approach is much more comprehensive than web carbon calculators, which are only based on
		global statistics. It allows the impact to be estimated using multi-criteria analysis
		(considering more than just the carbon footprint) and takes into account all phases of a product
		or service's life cycle. In this project, we will adhere to the LCA methodology requirements as
		closely as possible and use the most recent and coherent environmental data available.
	</p>

	<h3 class="!mt-10 text-xl font-semibold text-text-primary">Modeling Approach</h3>
	<p>
		Collecting primary data across all layers of AI systems remains challenging, particularly when
		relying on third-party services. Two approaches are typically used: bottom-up and top-down
		modeling.
	</p>
	<p>
		We adopt a bottom-up approach, which estimates impacts based on granular activity (such as
		token-level usage) and extrapolates system-level consumption. Although more complex, this
		approach is better suited to AI systems, where environmental impact is largely concentrated in
		back-end infrastructure (data centres and compute).
	</p>

	<h3 class="!mt-10 text-xl font-semibold text-text-primary">AI-Specific Modeling</h3>
	<p>
		To estimate large language model (LLM) inference, we build upon the methodology developed by
		<span class="text-text-primary">Ecologits / CodeCarbon</span>, which provides a reference
		framework for estimating environmental impacts of chatbot interactions.
	</p>
	<p>We retain the original system boundaries, focusing on inference only, including:</p>
	<ul class="list-disc space-y-1 pl-5">
		<li>GPU and server energy consumption</li>
		<li>Data centre overhead (cooling and infrastructure)</li>
	</ul>
	<p>We exclude:</p>
	<ul class="list-disc space-y-1 pl-5">
		<li>Model training</li>
		<li>Data storage</li>
		<li>End-user devices</li>
		<li>Network impacts</li>
	</ul>
	<p>These exclusions reflect current data limitations and methodological consistency.</p>
	<p>
		To extend the model beyond text-based systems, we adapt token-based modeling to image, audio,
		and video generation, drawing inspiration from the &ldquo;One Token Model&rdquo; developed by
		Antarctica.
	</p>

	<h3 class="!mt-10 text-xl font-semibold text-text-primary">
		From Energy to Environmental Impact
	</h3>
	<p>
		Once energy consumption is estimated for each use case, it is converted into environmental
		impact indicators. The total impact includes:
	</p>
	<ul class="list-disc space-y-1 pl-5">
		<li>
			<span class="text-text-primary">Embodied impact:</span> a share of emissions associated with the
			manufacturing of GPUs and servers, allocated over their lifespan
		</li>
		<li>
			<span class="text-text-primary">Usage impact:</span> emissions associated with electricity consumption
			during inference
		</li>
	</ul>
	<p>
		We account for data centre efficiency (PUE) and variations in electricity carbon intensity
		across regions to ensure results reflect real-world conditions.
	</p>

	<p class="!mt-10 text-text-primary">
		This methodology is designed to provide transparent and practical estimates, not absolute
		measurements.
	</p>
	<p class="text-text-primary">
		As AI technologies evolve and new data becomes available, the model will continue to be refined
		and improved.
	</p>
	<p>
		Read <a href="#" class="text-text-primary underline underline-offset-4">Full Methodology</a>
	</p>
</SectionIntro>
