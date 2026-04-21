<script lang="ts">
	import { page } from '$app/state';
	import { getLocale, localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
	import { pageMetrics } from '$lib/state/pageMetrics.svelte';
	import logo from '$lib/assets/logo.svg';

	const primary = [
		{ href: '/about', label: m.nav_about },
		{ href: '/calculator', label: m.nav_calculator },
		{ href: '/guide', label: m.nav_guide },
		{ href: '/facts', label: m.nav_facts }
	];

	const secondary = [
		{ href: '/glossary', label: m.nav_glossary },
		{ href: '/faq', label: m.nav_faq }
	];

	const otherLocale = $derived(getLocale() === 'en' ? 'fr' : 'en');
	const localeHref = $derived(localizeHref(page.url.pathname, { locale: otherLocale }));

	const isActive = (href: string) => page.url.pathname.endsWith(href);

	const year = new Date().getFullYear();

	const sizeLabel = $derived.by(() => {
		const bytes = pageMetrics.bytes;
		if (bytes == null) return '—';
		const kb = bytes / 1000;
		return `${kb < 10 ? kb.toFixed(1) : Math.round(kb)} kb`;
	});

	const co2Label = $derived.by(() => {
		const grams = pageMetrics.grams;
		if (grams == null) return '—';
		return `${grams < 1 ? grams.toFixed(3) : grams.toFixed(2)}g`;
	});
</script>

<footer class="mt-24 bg-background-soft text-text-primary">
	<div class="mx-auto max-w-7xl px-6 pt-20 pb-10">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-2">
			<div class="max-w-md">
				<a href={localizeHref('/')} class="inline-flex items-center">
					<img src={logo} alt="DGC Green — Low Carbon Gen-AI Toolkit" class="h-10 w-auto" />
				</a>

				<div class="mt-8 space-y-1 text-base leading-snug text-text-tertiary">
					<p>{m.footer_eco_notice({ size: sizeLabel, co2: co2Label })}</p>
					<p>
						{m.footer_calculated_with()}
						<a
							href="https://developers.thegreenwebfoundation.org/co2js/overview/"
							target="_blank"
							rel="noopener noreferrer"
							class="text-text-secondary underline underline-offset-2 transition-colors hover:text-text-primary"
						>
							CO2.js
						</a>
					</p>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-8 md:justify-self-end">
				<ul class="flex flex-col gap-3">
					{#each primary as item (item.href)}
						<li>
							<a
								href={localizeHref(item.href)}
								aria-current={isActive(item.href) ? 'page' : undefined}
								class="text-base transition-colors {isActive(item.href)
									? 'text-text-primary underline decoration-1 underline-offset-8'
									: 'text-text-secondary hover:text-text-primary'}"
							>
								{item.label()}
							</a>
						</li>
					{/each}
				</ul>

				<div class="flex flex-col gap-3">
					<ul class="flex flex-col gap-3">
						{#each secondary as item (item.href)}
							<li>
								<a
									href={localizeHref(item.href)}
									aria-current={isActive(item.href) ? 'page' : undefined}
									class="text-base transition-colors {isActive(item.href)
										? 'text-text-primary underline decoration-1 underline-offset-8'
										: 'text-text-secondary hover:text-text-primary'}"
								>
									{item.label()}
								</a>
							</li>
						{/each}
					</ul>

					<a
						href={localeHref}
						hreflang={otherLocale}
						data-sveltekit-reload
						class="mt-9 text-base text-text-secondary uppercase transition-colors hover:text-text-primary"
					>
						{otherLocale}
					</a>
				</div>
			</div>
		</div>

		<div class="mt-24 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-text-tertiary">
			<span>{m.footer_copyright({ year })}</span>
			<a href={localizeHref('/legals')} class="transition-colors hover:text-text-primary">
				{m.footer_legals()}
			</a>
			<a href={localizeHref('/privacy')} class="transition-colors hover:text-text-primary">
				{m.footer_privacy()}
			</a>
		</div>
	</div>
</footer>
