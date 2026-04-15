<script lang="ts">
	import { page } from '$app/state';
	import { getLocale, localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
	import logo from '$lib/assets/logo.svg';

	const primary = [
		{ href: '/about', label: m.nav_about },
		{ href: '/calculator', label: m.nav_calculator },
		{ href: '/guide', label: m.nav_guide },
		{ href: '/facts', label: m.nav_facts }
	];

	const secondary = [
		{ href: '/faq', label: m.nav_faq },
		{ href: '/glossary', label: m.nav_glossary }
	];

	const otherLocale = $derived(getLocale() === 'en' ? 'fr' : 'en');
	const localeHref = $derived(localizeHref(page.url.pathname, { locale: otherLocale }));

	const isActive = (href: string) => page.url.pathname.endsWith(href);

	const year = new Date().getFullYear();
</script>

<footer class="bg-background-soft text-text-primary mt-24">
	<div class="mx-auto max-w-7xl px-6 pt-20 pb-10">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-2">
			<div class="max-w-md">
				<a href={localizeHref('/')} class="inline-flex items-center">
					<img src={logo} alt="DGC Green — Low Carbon Gen-AI Toolkit" class="h-10 w-auto" />
				</a>

				<div class="text-text-tertiary mt-8 space-y-1 text-base leading-snug">
					<p>{m.footer_eco_notice({ size: '128 kb', co2: '0.019g' })}</p>
					<p>
						{m.footer_calculated_with()}
						<a
							href="https://developers.thegreenwebfoundation.org/co2js/overview/"
							target="_blank"
							rel="noopener noreferrer"
							class="text-text-secondary hover:text-text-primary underline underline-offset-2 transition-colors"
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
									? 'text-text-primary underline underline-offset-8 decoration-1'
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
										? 'text-text-primary underline underline-offset-8 decoration-1'
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
						class="text-text-secondary hover:text-text-primary mt-9 text-base uppercase transition-colors"
					>
						{otherLocale}
					</a>
				</div>
			</div>
		</div>

		<div
			class="text-text-tertiary mt-24 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm"
		>
			<span>{m.footer_copyright({ year })}</span>
			<a
				href={localizeHref('/legals')}
				class="hover:text-text-primary transition-colors"
			>
				{m.footer_legals()}
			</a>
			<a
				href={localizeHref('/privacy')}
				class="hover:text-text-primary transition-colors"
			>
				{m.footer_privacy()}
			</a>
		</div>
	</div>
</footer>
