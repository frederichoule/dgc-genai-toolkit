export const providers: Record<string, number> = {
	Google: 0.418,
	OpenAI: 0.363,
	Microsoft: 0.393,
	Anthropic: 0.501,
	'xAI (Grok)': 0.5,
	'US Average': 0.414,
	'Canada Average': 0.136,
	'World Average': 0.48
};

interface ModelConfig {
	tputInput: number;
	tputOutput: number;
	batchSize: number;
	nGpu: number;
	pBase: number;
	utilGpu: number;
	utilServer: number;
	pue: number;
	pGpu: number;
	lifespanGpu: number;
	embeddedImpactGpu: number;
	embeddedServerOverhead: number;
}

const configs: Record<string, ModelConfig> = {
	text: {
		tputInput: 15000,
		tputOutput: 30,
		batchSize: 4,
		nGpu: 8,
		pBase: 0.575,
		utilGpu: 0.7,
		utilServer: 0.5,
		pue: 1.15,
		pGpu: 0.7,
		lifespanGpu: 26298,
		embeddedImpactGpu: 128.3,
		embeddedServerOverhead: 1.25
	},
	image: {
		tputInput: 15000,
		tputOutput: 85,
		batchSize: 1,
		nGpu: 1,
		pBase: 0.575,
		utilGpu: 0.7,
		utilServer: 0.5,
		pue: 1.15,
		pGpu: 0.7,
		lifespanGpu: 26298,
		embeddedImpactGpu: 128.3,
		embeddedServerOverhead: 1.25
	},
	video: {
		tputInput: 15000,
		tputOutput: 1335,
		batchSize: 1,
		nGpu: 8,
		pBase: 0.575,
		utilGpu: 0.7,
		utilServer: 0.5,
		pue: 1.15,
		pGpu: 0.7,
		lifespanGpu: 26298,
		embeddedImpactGpu: 128.3,
		embeddedServerOverhead: 1.25
	},
	audio: {
		tputInput: 15000,
		tputOutput: 600,
		batchSize: 4,
		nGpu: 1,
		pBase: 0.575,
		utilGpu: 0.7,
		utilServer: 0.5,
		pue: 1.15,
		pGpu: 0.7,
		lifespanGpu: 26298,
		embeddedImpactGpu: 128.3,
		embeddedServerOverhead: 1.25
	}
};

const REASONING_OVERHEAD = 800;
const TOKEN_FRAME_FACTOR_HD = 450;
const TOKEN_FRAME_FACTOR_FHD = 1013;
const TOKEN_AUDIO_FACTOR = 300;
const DEFAULT_PROMPT_TOKENS = 50;

export interface Result {
	inferenceTimeS: number;
	energyPerGenKwh: number;
	co2PerGenKg: number;
	totalEnergyKwh: number;
	totalCo2Kg: number;
	generations: number;
}

function compute(
	tokensInput: number,
	tokensOutput: number,
	generations: number,
	carbonIntensity: number,
	cfg: ModelConfig
): Result {
	const timeInputS = tokensInput / cfg.tputInput;
	const timeOutputS = tokensOutput / cfg.tputOutput;
	const inferenceTimeS = timeInputS + timeOutputS;
	const inferenceTimeH = inferenceTimeS / 3600;

	const power = (cfg.nGpu * (cfg.pGpu * cfg.utilGpu + cfg.pBase * cfg.utilServer)) / cfg.batchSize;

	const energyPerGen = power * inferenceTimeH;
	const usageImpact = energyPerGen * cfg.pue * carbonIntensity;
	const embeddedImpact =
		(cfg.nGpu * cfg.embeddedImpactGpu * cfg.embeddedServerOverhead * inferenceTimeH) /
		cfg.lifespanGpu /
		cfg.batchSize;
	const co2PerGen = usageImpact + embeddedImpact;

	return {
		inferenceTimeS,
		energyPerGenKwh: energyPerGen,
		co2PerGenKg: co2PerGen,
		totalEnergyKwh: energyPerGen * generations,
		totalCo2Kg: co2PerGen * generations,
		generations
	};
}

export function calculateText(
	pages: number,
	tokensPerPage: number,
	reasoning: boolean,
	outputPages: number,
	provider: string
): Result {
	const tokensInput = pages * tokensPerPage;
	const tokensOutputBase = outputPages * tokensPerPage;
	const tokensOutput = reasoning ? tokensOutputBase + REASONING_OVERHEAD : tokensOutputBase;
	return compute(tokensInput, tokensOutput, 1, providers[provider], configs.text);
}

function imageTokens(resolution: string): number {
	const [w, h] = resolution.split('x').map(Number);
	const side = Math.max(w, h);
	return Math.round(43 * Math.sqrt(side) + 222);
}

export function calculateImage(
	iterations: number,
	imagesPerGen: number,
	resolution: string,
	provider: string
): Result {
	const tokensOutput = imageTokens(resolution) * imagesPerGen;
	return compute(
		DEFAULT_PROMPT_TOKENS,
		tokensOutput,
		iterations,
		providers[provider],
		configs.image
	);
}

export function calculateVideo(
	iterations: number,
	durationS: number,
	resolution: 'HD' | 'FHD',
	fps: number,
	provider: string
): Result {
	const tokenFactor = resolution === 'HD' ? TOKEN_FRAME_FACTOR_HD : TOKEN_FRAME_FACTOR_FHD;
	const tokensOutput = durationS * fps * tokenFactor;
	return compute(
		DEFAULT_PROMPT_TOKENS,
		tokensOutput,
		iterations,
		providers[provider],
		configs.video
	);
}

export function calculateAudio(iterations: number, durationS: number, provider: string): Result {
	const tokensOutput = durationS * TOKEN_AUDIO_FACTOR;
	return compute(
		DEFAULT_PROMPT_TOKENS,
		tokensOutput,
		iterations,
		providers[provider],
		configs.audio
	);
}

export const co2Equivalences = [
	{ label: 'Eggs', factorKg: 0.1128 },
	{ label: 'Pints of beer', factorKg: 0.675 },
	{ label: 'Croissants', factorKg: 0.147 },
	{ label: 'Hours of video streaming', factorKg: 0.064 },
	{ label: 'Emails sent', factorKg: 0.00011 },
	{ label: 'Web searches', factorKg: 0.00123 },
	{ label: 'Hours of video conference', factorKg: 0.016 }
];

export const energyEquivalences = [
	{ label: 'LED bulb hours', factorKwh: 0.006 },
	{ label: 'Microwave minutes', factorKwh: 0.013 }
];
