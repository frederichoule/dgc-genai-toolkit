<script lang="ts">
	import { ChevronDown, FileText, Image, Music, PlaySquare } from 'lucide-svelte';
	import Button from '$lib/components/Button.svelte';
	import Pill from '$lib/components/Pill.svelte';
	import Input from '$lib/components/Input.svelte';
	import Select from '$lib/components/Select.svelte';

	type TaskType = 'summary' | 'image' | 'audio' | 'video';

	const defaults = {
		pagesToRead: 30,
		useReasoning: 'with',
		imageAttempts: 30,
		videoAttempts: 4,
		videoDuration: 8,
		audioAttempts: 30,
		audioDuration: 30
	};

	let selectedTask = $state<TaskType | null>(null);
	let pagesToRead = $state(defaults.pagesToRead);
	let useReasoning = $state(defaults.useReasoning);
	let imageAttempts = $state(defaults.imageAttempts);
	let videoAttempts = $state(defaults.videoAttempts);
	let videoDuration = $state(defaults.videoDuration);
	let audioAttempts = $state(defaults.audioAttempts);
	let audioDuration = $state(defaults.audioDuration);

	function reset() {
		selectedTask = null;
		pagesToRead = defaults.pagesToRead;
		useReasoning = defaults.useReasoning;
		imageAttempts = defaults.imageAttempts;
		videoAttempts = defaults.videoAttempts;
		videoDuration = defaults.videoDuration;
		audioAttempts = defaults.audioAttempts;
		audioDuration = defaults.audioDuration;
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
								{ value: 'with', label: 'With a reasoning model' },
								{ value: 'without', label: 'Without a reasoning model' }
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
							class="flex items-center gap-2 text-sm text-text-tertiary hover:text-text-primary"
						>
							Display advanced mode
							<ChevronDown class="size-4" strokeWidth={1.75} />
						</button>
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
