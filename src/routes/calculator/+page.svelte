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

	let { data } = $props();

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
		imageResolution: '2816x1536',
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
	let imageResolution = $state(defaults.imageResolution);
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

	const imageResolutionOptions = [
		{ value: '1024x1024', label: '1024×1024' },
		{ value: '896x1280', label: '896×1280' },
		{ value: '1280x896', label: '1280×896' },
		{ value: '768x1408', label: '768×1408' },
		{ value: '1408x768', label: '1408×768' },
		{ value: '2048x2048', label: '2048×2048' },
		{ value: '1792x2560', label: '1792×2560' },
		{ value: '2560x1792', label: '2560×1792' },
		{ value: '1536x2816', label: '1536×2816' },
		{ value: '2816x1536', label: '2K (2816×1536)' }
	];

	type Snapshot = {
		selectedTask: TaskType | null;
		pagesToRead: number;
		useReasoning: string;
		textTokensPerPage: number;
		textOutputPages: number;
		imageAttempts: number;
		imageImagesPerIteration: number;
		imageResolution: string;
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
			imageResolution,
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
		imageResolution = defaults.imageResolution;
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
			computed = calculateImage(imageAttempts, imageImagesPerIteration, imageResolution, provider);
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
		{ id: 'summary', label: m.calc_task_text, icon: TextIcon, color: 'lime' },
		{ id: 'image', label: m.calc_task_image, icon: ImageIcon, color: 'mint' },
		{ id: 'audio', label: m.calc_task_audio, icon: AudioIcon, color: 'spring' },
		{ id: 'video', label: m.calc_task_video, icon: PresentationIcon, color: 'forest' }
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
			key: 'web_searches',
			label: m.equiv_web_searches,
			format: { maximumFractionDigits: 0 } as Intl.NumberFormatOptions
		},
		{
			icon: EmailIcon,
			value: result ? Math.round(result.totalCo2Kg / co2Factor('Emails sent')) : 0,
			unit: '',
			key: 'emails_sent',
			label: m.equiv_emails_sent,
			format: { maximumFractionDigits: 0 } as Intl.NumberFormatOptions
		},
		{
			icon: PresentationIcon,
			value: result ? (result.totalCo2Kg / co2Factor('Hours of video streaming')) * 60 : 0,
			isTime: true,
			key: 'streaming',
			label: m.equiv_streaming
		},
		{
			icon: VideoCallIcon,
			value: result ? (result.totalCo2Kg / co2Factor('Hours of video conference')) * 60 : 0,
			isTime: true,
			key: 'video_call',
			label: m.equiv_video_call
		},
		{
			icon: LightbulbIcon,
			value: (kwh / kwhFactor('LED bulb hours')) * 60,
			isTime: true,
			key: 'led_light',
			label: m.equiv_led_light
		},
		{
			icon: MicrowaveIcon,
			value: kwh / kwhFactor('Microwave minutes'),
			isTime: true,
			key: 'microwave',
			label: m.equiv_microwave
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
		<p class="text-xs tracking-[0.18em] text-text-tertiary uppercase">{m.calc_eyebrow()}</p>
		<h1 class="mt-3 text-5xl font-normal tracking-tight text-text-primary sm:text-6xl">
			{m.calc_heading()}
		</h1>

		<div class="mt-12">
			<div class="space-y-4">
				<p class="text-sm text-text-tertiary">{m.calc_select_prompt()}</p>
				<div class="flex flex-wrap gap-x-3 gap-y-2">
					{#each tasks as task, i (task.id)}
						<Pill
							label={task.label()}
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
							label={m.calc_q_pages_input()}
							type="number"
							min={1}
							bind:value={pagesToRead}
						/>
						<Select
							id="use-reasoning"
							label={m.calc_q_reasoning()}
							tooltip={m.calc_reasoning_tooltip()}
							bind:value={useReasoning}
							options={[
								{ value: '1', label: m.calc_reasoning_yes() },
								{ value: '0', label: m.calc_reasoning_no() }
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
					<div class="space-y-8 pt-8">
						<Input
							id="image-attempts"
							label={m.calc_q_iterations()}
							type="number"
							min={1}
							bind:value={imageAttempts}
						/>
						<Select
							id="image-resolution"
							label={m.calc_q_image_resolution()}
							bind:value={imageResolution}
							options={imageResolutionOptions}
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
							label={m.calc_q_iterations()}
							type="number"
							min={1}
							bind:value={videoAttempts}
						/>
						<Input
							id="video-duration"
							label={m.calc_q_video_duration()}
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
							label={m.calc_q_iterations()}
							type="number"
							min={1}
							bind:value={audioAttempts}
						/>
						<Input
							id="audio-duration"
							label={m.calc_q_audio_duration()}
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
							{m.calc_advanced_toggle()}
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
							label={m.calc_q_tokens_per_page()}
							type="number"
							min={1}
							bind:value={textTokensPerPage}
						/>
						<Input
							id="text-output-pages"
							label={m.calc_q_output_pages()}
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
							label={m.calc_q_images_per_prompt()}
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
							label={m.calc_q_video_quality()}
							bind:value={videoQuality}
							options={videoQualityOptions}
						/>
						<Input
							id="video-fps"
							label={m.calc_q_video_fps()}
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
							label={m.calc_q_provider()}
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
					{m.calc_submit()}
				</Button>
			</div>

			<div
				class="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
				style:grid-template-rows={selectedTask ? '1fr' : '0fr'}
			>
				<div class="min-h-0">
					<div class="pt-4">
						<Button variant="outline" fullWidth onclick={reset}>{m.calc_reset()}</Button>
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
				<p class="text-sm">{m.calc_result_label()}</p>
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

			<p class="mt-10 text-sm {panelColors[activeColor].text}">{m.calc_equiv_intro()}</p>

			<div
				class="mt-6 grid grid-flow-row gap-x-8 gap-y-8 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-3"
			>
				{#each equivalences as item, i (item.key)}
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
										{m.calc_unit_hours()}
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
										{m.calc_unit_minutes()}
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
								{item.label()}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</section>

<hr class="border-border" />

<SectionIntro eyebrow={data.frontmatter.eyebrow} title={data.frontmatter.title} class="py-16">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	<div
		class="markdown prose-ul:list-disc prose-ul:space-y-1 prose-ul:pl-5"
	>
		{@html data.html}
	</div>
</SectionIntro>
