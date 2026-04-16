<script lang="ts">
	import {
		ChevronDown,
		FileText,
		Image,
		Music,
		PlaySquare,
		Search,
		MailCheck,
		MonitorPlay,
		Users,
		Lightbulb,
		Microwave
	} from 'lucide-svelte';
	import Button from '$lib/components/Button.svelte';
	import Pill from '$lib/components/Pill.svelte';
	import Input from '$lib/components/Input.svelte';
	import Select from '$lib/components/Select.svelte';
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
		{ id: 'summary', label: 'A text summary', icon: FileText, color: 'lime' },
		{ id: 'image', label: 'An image', icon: Image, color: 'mint' },
		{ id: 'audio', label: 'An audio clip', icon: Music, color: 'spring' },
		{ id: 'video', label: 'A video clip', icon: PlaySquare, color: 'forest' }
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
			icon: Search,
			value: result ? result.totalCo2Kg / co2Factor('Web searches') : 0,
			unit: '',
			label: 'web searches'
		},
		{
			icon: MailCheck,
			value: result ? result.totalCo2Kg / co2Factor('Emails sent') : 0,
			unit: '',
			label: 'emails sent'
		},
		{
			icon: MonitorPlay,
			value: result ? (result.totalCo2Kg / co2Factor('Hours of video streaming')) * 60 : 0,
			unit: 'min',
			label: 'of streaming'
		},
		{
			icon: Users,
			value: result ? result.totalCo2Kg / co2Factor('Hours of video conference') : 0,
			unit: 'h',
			label: 'of video call with 2 people'
		},
		{
			icon: Lightbulb,
			value: kwh / kwhFactor('LED bulb hours'),
			unit: 'h',
			label: 'of LED light'
		},
		{
			icon: Microwave,
			value: kwh / kwhFactor('Microwave minutes'),
			unit: 'min',
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
							label="Use a reasoning model?"
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
					Estimate your AI footprint
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
			<div class="rounded-3xl {panelColors[activeColor].bg} p-5 pb-1 text-background sm:p-6 sm:pb-2">
				<p class="text-sm">Estimated emissions</p>
				<p class="mt-0 flex items-baseline gap-2">
					<span
						class="inline-block text-8xl leading-none font-bold tracking-tight -mt-[0.3em] -mb-[0.2em] sm:text-9xl"
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
						<Icon class="size-14 shrink-0 {panelColors[activeColor].text}" strokeWidth={1.25} />
						<div class="flex flex-col">
							<p class="flex items-baseline gap-1">
								<span
									class="inline-block text-5xl leading-none font-bold tracking-tight -mb-[0.3em] {panelColors[activeColor].text}"
								>
									<NumberFlow value={v} format={fmtOpts(v)} />
								</span>
								{#if item.unit}
									<span
										class="-mb-[0.25em] text-sm font-semibold {panelColors[activeColor].text}"
									>
										{item.unit}
									</span>
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
