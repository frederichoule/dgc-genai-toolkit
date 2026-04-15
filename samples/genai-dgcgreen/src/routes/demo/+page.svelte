<script lang="ts">
	import {
		providers,
		calculateText,
		calculateImage,
		calculateVideo,
		calculateAudio,
		co2Equivalences,
		energyEquivalences,
		type Result
	} from '$lib/calculator';

	let expertMode = $state(false);
	let provider = $state('Google');

	// Text
	let textEnabled = $state(true);
	let textPages = $state(100);
	let textTokensPerPage = $state(500);
	let textReasoning = $state(true);
	let textOutputPages = $state(1);

	// Image
	let imageEnabled = $state(true);
	let imageIterations = $state(30);
	let imageImagesPerGen = $state(1);

	// Video
	let videoEnabled = $state(true);
	let videoIterations = $state(4);
	let videoDuration = $state(8);
	let videoResolution = $state<'HD' | 'FHD'>('HD');
	let videoFps = $state(24);

	// Audio
	let audioEnabled = $state(true);
	let audioIterations = $state(30);
	let audioDuration = $state(30);

	let textResult: Result | null = $derived(
		textEnabled
			? calculateText(textPages, textTokensPerPage, textReasoning, textOutputPages, provider)
			: null
	);

	let imageResult: Result | null = $derived(
		imageEnabled ? calculateImage(imageIterations, imageImagesPerGen, provider) : null
	);

	let videoResult: Result | null = $derived(
		videoEnabled
			? calculateVideo(videoIterations, videoDuration, videoResolution, videoFps, provider)
			: null
	);

	let audioResult: Result | null = $derived(
		audioEnabled ? calculateAudio(audioIterations, audioDuration, provider) : null
	);

	let totalEnergy = $derived(
		(textResult?.totalEnergyKwh ?? 0) +
			(imageResult?.totalEnergyKwh ?? 0) +
			(videoResult?.totalEnergyKwh ?? 0) +
			(audioResult?.totalEnergyKwh ?? 0)
	);

	let totalCo2Kg = $derived(
		(textResult?.totalCo2Kg ?? 0) +
			(imageResult?.totalCo2Kg ?? 0) +
			(videoResult?.totalCo2Kg ?? 0) +
			(audioResult?.totalCo2Kg ?? 0)
	);

	function fmtEnergy(kwh: number): string {
		return kwh < 0.001 ? kwh.toExponential(2) : kwh.toFixed(3);
	}

	function fmtCo2(kg: number): string {
		const g = kg * 1000;
		return g < 0.1 ? g.toFixed(3) : g.toFixed(1);
	}

	function fmtEquiv(value: number): string {
		if (value < 0.1) return value.toFixed(2);
		if (value < 10) return value.toFixed(1);
		return Math.round(value).toLocaleString();
	}
</script>

<div class="mx-auto max-w-4xl p-6">
	<div class="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
		<p class="font-semibold">Demo Preview</p>
		<p>
			This is a working prototype for the Directors Guild of Canada to test and validate the
			calculator before the final version is built.
		</p>
	</div>

	<h1 class="mb-1 text-2xl font-bold">AI Environmental Impact Calculator</h1>
	<p class="mb-6 text-sm text-gray-500">
		Estimate the energy and carbon footprint of generative AI tasks for film &amp; media production
	</p>

	<!-- Global controls -->
	<div class="mb-6 flex flex-wrap items-center gap-4 rounded-lg bg-gray-50 p-4">
		<label class="flex items-center gap-2 text-sm">
			<input type="checkbox" bind:checked={expertMode} />
			Expert Mode
		</label>
		{#if expertMode}
			<label class="flex items-center gap-2 text-sm">
				AI Provider:
				<select bind:value={provider} class="rounded border-gray-300 text-sm">
					{#each Object.keys(providers) as p (p)}
						<option value={p}>{p}</option>
					{/each}
				</select>
			</label>
			<span class="text-xs text-gray-400">{providers[provider]} kgCO2e/kWh</span>
		{/if}
	</div>

	<!-- Use Cases -->
	<div class="space-y-4">
		<!-- TEXT -->
		<section class="rounded-lg border p-4">
			<label class="mb-3 flex items-center gap-2">
				<input type="checkbox" bind:checked={textEnabled} />
				<h2 class="text-lg font-semibold">Text: Read &amp; Summarize a Document</h2>
			</label>
			{#if textEnabled && textResult}
				<div class="grid gap-4 sm:grid-cols-2">
					<div class="space-y-2">
						<label class="block text-sm">
							Pages to read
							<input
								type="number"
								bind:value={textPages}
								min="1"
								class="mt-1 block w-full rounded border-gray-300 text-sm"
							/>
						</label>
						<label class="flex items-center gap-2 text-sm">
							<input type="checkbox" bind:checked={textReasoning} />
							Use reasoning model
						</label>
						{#if expertMode}
							<div class="mt-2 space-y-2 rounded border border-dashed border-purple-300 bg-purple-50 p-3">
								<span class="text-xs font-medium text-purple-600">Expert</span>
								<label class="block text-sm">
									Tokens per page
									<input
										type="number"
										bind:value={textTokensPerPage}
										min="1"
										class="mt-1 block w-full rounded border-gray-300 text-sm"
									/>
								</label>
								<label class="block text-sm">
									Output pages
									<input
										type="number"
										bind:value={textOutputPages}
										min="1"
										class="mt-1 block w-full rounded border-gray-300 text-sm"
									/>
								</label>
							</div>
						{/if}
					</div>
					<div class="rounded bg-gray-50 p-3">
						<p class="text-sm">
							<strong>Energy:</strong>
							{fmtEnergy(textResult.totalEnergyKwh)} kWh
						</p>
						<p class="text-sm">
							<strong>CO2:</strong>
							{fmtCo2(textResult.totalCo2Kg)} g CO2e
						</p>
						<p class="text-xs text-gray-400">
							Inference: {textResult.inferenceTimeS.toFixed(1)}s
						</p>
					</div>
				</div>
			{/if}
		</section>

		<!-- IMAGE -->
		<section class="rounded-lg border p-4">
			<label class="mb-3 flex items-center gap-2">
				<input type="checkbox" bind:checked={imageEnabled} />
				<h2 class="text-lg font-semibold">Image: Generate a Photo from Text</h2>
			</label>
			{#if imageEnabled && imageResult}
				<div class="grid gap-4 sm:grid-cols-2">
					<div class="space-y-2">
						<label class="block text-sm">
							Attempts / iterations
							<input
								type="number"
								bind:value={imageIterations}
								min="1"
								class="mt-1 block w-full rounded border-gray-300 text-sm"
							/>
						</label>
						{#if expertMode}
							<div class="mt-2 space-y-2 rounded border border-dashed border-purple-300 bg-purple-50 p-3">
								<span class="text-xs font-medium text-purple-600">Expert</span>
								<label class="block text-sm">
									Images per generation
									<input
										type="number"
										bind:value={imageImagesPerGen}
										min="1"
										max="4"
										class="mt-1 block w-full rounded border-gray-300 text-sm"
									/>
								</label>
							</div>
						{/if}
					</div>
					<div class="rounded bg-gray-50 p-3">
						<p class="text-sm">
							<strong>Energy:</strong>
							{fmtEnergy(imageResult.totalEnergyKwh)} kWh
						</p>
						<p class="text-sm">
							<strong>CO2:</strong>
							{fmtCo2(imageResult.totalCo2Kg)} g CO2e
						</p>
						<p class="text-xs text-gray-400">
							Inference: {imageResult.inferenceTimeS.toFixed(1)}s x {imageResult.generations}
							generations
						</p>
					</div>
				</div>
			{/if}
		</section>

		<!-- VIDEO -->
		<section class="rounded-lg border p-4">
			<label class="mb-3 flex items-center gap-2">
				<input type="checkbox" bind:checked={videoEnabled} />
				<h2 class="text-lg font-semibold">Video: Generate a Video from Text</h2>
			</label>
			{#if videoEnabled && videoResult}
				<div class="grid gap-4 sm:grid-cols-2">
					<div class="space-y-2">
						<label class="block text-sm">
							Attempts / iterations
							<input
								type="number"
								bind:value={videoIterations}
								min="1"
								class="mt-1 block w-full rounded border-gray-300 text-sm"
							/>
						</label>
						<label class="block text-sm">
							Duration (seconds)
							<input
								type="number"
								bind:value={videoDuration}
								min="1"
								class="mt-1 block w-full rounded border-gray-300 text-sm"
							/>
						</label>
						{#if expertMode}
							<div class="mt-2 space-y-2 rounded border border-dashed border-purple-300 bg-purple-50 p-3">
								<span class="text-xs font-medium text-purple-600">Expert</span>
								<label class="block text-sm">
									Resolution
									<select
										bind:value={videoResolution}
										class="mt-1 block w-full rounded border-gray-300 text-sm"
									>
										<option value="HD">HD (720x1280)</option>
										<option value="FHD">Full HD (1920x1080)</option>
									</select>
								</label>
								<label class="block text-sm">
									Frames per second
									<input
										type="number"
										bind:value={videoFps}
										min="1"
										class="mt-1 block w-full rounded border-gray-300 text-sm"
									/>
								</label>
							</div>
						{/if}
					</div>
					<div class="rounded bg-gray-50 p-3">
						<p class="text-sm">
							<strong>Energy:</strong>
							{fmtEnergy(videoResult.totalEnergyKwh)} kWh
						</p>
						<p class="text-sm">
							<strong>CO2:</strong>
							{fmtCo2(videoResult.totalCo2Kg)} g CO2e
						</p>
						<p class="text-xs text-gray-400">
							Inference: {videoResult.inferenceTimeS.toFixed(1)}s x {videoResult.generations}
							generations
						</p>
					</div>
				</div>
			{/if}
		</section>

		<!-- AUDIO -->
		<section class="rounded-lg border p-4">
			<label class="mb-3 flex items-center gap-2">
				<input type="checkbox" bind:checked={audioEnabled} />
				<h2 class="text-lg font-semibold">Audio: Generate an Audio Clip from Text</h2>
			</label>
			{#if audioEnabled && audioResult}
				<div class="grid gap-4 sm:grid-cols-2">
					<div class="space-y-2">
						<label class="block text-sm">
							Attempts / iterations
							<input
								type="number"
								bind:value={audioIterations}
								min="1"
								class="mt-1 block w-full rounded border-gray-300 text-sm"
							/>
						</label>
						<label class="block text-sm">
							Duration (seconds)
							<input
								type="number"
								bind:value={audioDuration}
								min="1"
								class="mt-1 block w-full rounded border-gray-300 text-sm"
							/>
						</label>
					</div>
					<div class="rounded bg-gray-50 p-3">
						<p class="text-sm">
							<strong>Energy:</strong>
							{fmtEnergy(audioResult.totalEnergyKwh)} kWh
						</p>
						<p class="text-sm">
							<strong>CO2:</strong>
							{fmtCo2(audioResult.totalCo2Kg)} g CO2e
						</p>
						<p class="text-xs text-gray-400">
							Inference: {audioResult.inferenceTimeS.toFixed(1)}s x {audioResult.generations}
							generations
						</p>
					</div>
				</div>
			{/if}
		</section>
	</div>

	<!-- TOTALS -->
	<section class="mt-6 rounded-lg border-2 border-green-700 p-4">
		<h2 class="mb-3 text-lg font-bold">Total Impact</h2>
		<div class="mb-4 grid grid-cols-2 gap-4">
			<div>
				<p class="text-2xl font-bold">{fmtEnergy(totalEnergy)} kWh</p>
				<p class="text-xs text-gray-500">Total energy consumption</p>
			</div>
			<div>
				<p class="text-2xl font-bold">{fmtCo2(totalCo2Kg)} g CO2e</p>
				<p class="text-xs text-gray-500">Total carbon footprint</p>
			</div>
		</div>

		<h3 class="mb-2 text-sm font-semibold">That's equivalent to...</h3>
		<div class="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
			{#each co2Equivalences as eq (eq.label)}
				<div class="rounded bg-gray-50 px-3 py-2 text-sm">
					<span class="font-semibold">{fmtEquiv(totalCo2Kg / eq.factorKg)}</span>
					{eq.label}
				</div>
			{/each}
		</div>

		<h3 class="mb-2 text-sm font-semibold">Energy equivalent to...</h3>
		<div class="grid grid-cols-2 gap-2">
			{#each energyEquivalences as eq (eq.label)}
				<div class="rounded bg-gray-50 px-3 py-2 text-sm">
					<span class="font-semibold">{fmtEquiv(totalEnergy / eq.factorKwh)}</span>
					{eq.label}
				</div>
			{/each}
		</div>
	</section>

	<p class="mt-4 text-xs text-gray-400">
		Methodology: Decarbonade (Jan 2026) for DGC. LCA model based on NVIDIA H100 / DGX H100
		hardware, with usage + embedded carbon. Validated against ML.Energy benchmarks.
	</p>
</div>
