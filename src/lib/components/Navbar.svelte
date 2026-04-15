<script lang="ts">
	import { page } from '$app/state';
	import { getLocale, localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
	import logo from '$lib/assets/logo.svg';

	let open = $state(false);

	const items = [
		{ href: '/about', label: m.nav_about },
		{ href: '/calculator', label: m.nav_calculator },
		{ href: '/guide', label: m.nav_guide },
		{ href: '/facts', label: m.nav_facts },
		{ href: '/faq', label: m.nav_faq }
	];

	const isActive = (href: string) => page.url.pathname.endsWith(href);

	const otherLocale = $derived(getLocale() === 'en' ? 'fr' : 'en');
	const localeHref = $derived(localizeHref(page.url.pathname, { locale: otherLocale }));
</script>

<nav class="bg-background text-text-primary sticky top-0 z-50">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
		<a href={localizeHref('/')} class="flex items-center">
			<img src={logo} alt="DGC Green — Low Carbon Gen-AI Toolkit" class="h-8 w-auto" />
		</a>

		<div class="flex items-center gap-8">
			<ul class="hidden items-center gap-8 md:flex">
				{#each items as item (item.href)}
					<li>
						<a
							href={localizeHref(item.href)}
							aria-current={isActive(item.href) ? 'page' : undefined}
							class="text-sm transition-colors {isActive(item.href)
								? 'text-text-primary underline underline-offset-8 decoration-1'
								: 'text-text-secondary hover:text-text-primary'}"
						>
							{item.label()}
						</a>
					</li>
				{/each}
			</ul>

			<ul class="flex items-center">
				<li>
					<a
						href={localeHref}
						hreflang={otherLocale}
						data-sveltekit-reload
						class="text-text-secondary hover:text-text-primary text-sm uppercase transition-colors"
					>
						{otherLocale}
					</a>
				</li>
			</ul>

			<button
				type="button"
				aria-label="Toggle menu"
				aria-expanded={open}
				onclick={() => (open = !open)}
				class="text-text-primary md:hidden"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="size-6"
				>
					{#if open}
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					{:else}
						<line x1="3" y1="6" x2="21" y2="6"></line>
						<line x1="3" y1="12" x2="21" y2="12"></line>
						<line x1="3" y1="18" x2="21" y2="18"></line>
					{/if}
				</svg>
			</button>
		</div>
	</div>

	{#if open}
		<div class="border-t border-white/5 px-6 py-4 md:hidden">
			<ul class="flex flex-col gap-4">
				{#each items as item (item.href)}
					<li>
						<a
							href={localizeHref(item.href)}
							aria-current={isActive(item.href) ? 'page' : undefined}
							onclick={() => (open = false)}
							class="block text-lg {isActive(item.href)
								? 'text-text-primary underline underline-offset-8 decoration-1'
								: 'text-text-secondary hover:text-text-primary'}"
						>
							{item.label()}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</nav>
