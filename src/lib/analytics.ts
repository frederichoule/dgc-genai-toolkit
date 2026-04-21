declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
	const clean: Record<string, unknown> = {};
	for (const [k, v] of Object.entries(params)) {
		if (v !== undefined && v !== null) clean[k] = v;
	}

	if (import.meta.env.DEV) {
		console.debug('[analytics]', name, clean);
	}

	if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
	window.gtag('event', name, clean);
}

export function gramsBucket(g: number): string {
	if (g < 10) return '0-10';
	if (g < 100) return '10-100';
	if (g < 1000) return '100-1k';
	if (g < 10000) return '1k-10k';
	return '10k+';
}

export function roundGrams(g: number): number {
	return g >= 10 ? Math.round(g) : Math.round(g * 100) / 100;
}
