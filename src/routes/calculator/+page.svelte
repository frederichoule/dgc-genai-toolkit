<script lang="ts">
	import { ChevronDown, FileText, Image, Music, PlaySquare } from 'lucide-svelte';
	import Button from '$lib/components/Button.svelte';
	import Pill from '$lib/components/Pill.svelte';
	import Input from '$lib/components/Input.svelte';
	import Select from '$lib/components/Select.svelte';

	type TaskType = 'summary' | 'image' | 'audio' | 'video';

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
	}

	const tasks = [
		{ id: 'summary', label: 'A text summary', icon: FileText, color: 'lime' },
		{ id: 'image', label: 'An image', icon: Image, color: 'mint' },
		{ id: 'audio', label: 'An audio clip', icon: Music, color: 'spring' },
		{ id: 'video', label: 'A video clip', icon: PlaySquare, color: 'forest' }
	] as const;
</script>

<section class="grid grid-cols-1 gap-12 py-16 lg:grid-cols-2">
	<div class="max-w-xl">
		<p class="text-xs uppercase tracking-[0.18em] text-text-tertiary">Emissions calculator</p>
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
							onclick={() => (selectedTask = task.id)}
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
								class="size-4 transition-transform duration-300 {showAdvanced
									? 'rotate-180'
									: ''}"
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
				<Button variant="white" arrow fullWidth size="lg" disabled={selectedTask === null}>
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
</section>
