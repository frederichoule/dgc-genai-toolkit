<script lang="ts">
	import { slide } from 'svelte/transition';
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

		<div class="mt-12 space-y-8">
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

			{#if selectedTask}
				{#key selectedTask}
					<div class="space-y-8" transition:slide={{ duration: 300 }}>
						{#if selectedTask === 'summary'}
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
						{:else if selectedTask === 'image'}
							<Input
								id="image-attempts"
								label="Attempts / iterations"
								type="number"
								min={1}
								bind:value={imageAttempts}
							/>
						{:else if selectedTask === 'video'}
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
						{:else if selectedTask === 'audio'}
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
						{/if}
					</div>
				{/key}

				<div transition:slide={{ duration: 300 }}>
					<button
						type="button"
						class="flex items-center gap-2 text-sm text-text-tertiary hover:text-text-primary"
					>
						Display advanced mode
						<ChevronDown class="size-4" strokeWidth={1.75} />
					</button>
				</div>
			{/if}

			<Button variant="white" arrow fullWidth size="lg" disabled={selectedTask === null}>
				Estimate your AI footprint
			</Button>

			{#if selectedTask}
				<div transition:slide={{ duration: 300 }}>
					<Button variant="outline" fullWidth onclick={reset}>Reset</Button>
				</div>
			{/if}
		</div>
	</div>
</section>
