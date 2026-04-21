import { browser } from '$app/environment';
import { afterNavigate, beforeNavigate } from '$app/navigation';
import { co2 as Co2 } from '@tgwf/co2';
import { pageMetrics } from '$lib/state/pageMetrics.svelte';

const GREEN_HOSTING = true;
const SETTLE_MS = 500;

let initialized = false;
let navStartTime = 0;

export function initCo2Tracker(): void {
	if (!browser || initialized) return;
	initialized = true;

	const emissions = new Co2({ model: 'swd' });

	beforeNavigate(() => {
		navStartTime = performance.now();
		pageMetrics.bytes = null;
		pageMetrics.grams = null;
	});

	afterNavigate(({ type }) => {
		const isInitial = type === 'enter';
		const since = isInitial ? 0 : navStartTime;

		const measure = () => {
			setTimeout(() => {
				const bytes = sumTransferBytes(since, isInitial);
				const grams = emissions.perVisit(bytes, GREEN_HOSTING);
				pageMetrics.bytes = bytes;
				pageMetrics.grams = grams;
			}, SETTLE_MS);
		};

		if (document.readyState === 'complete') {
			measure();
		} else {
			window.addEventListener('load', measure, { once: true });
		}
	});
}

function sumTransferBytes(since: number, includeNavigation: boolean): number {
	let total = 0;

	if (includeNavigation) {
		const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
		for (const entry of navEntries) {
			total += entry.transferSize || entry.encodedBodySize || 0;
		}
	}

	const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
	for (const entry of resources) {
		if (entry.startTime < since) continue;
		total += entry.transferSize;
	}

	return total;
}
