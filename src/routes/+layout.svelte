<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { Pathname } from '$app/types';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { initCo2Tracker } from '$lib/co2/tracker.svelte';
	import { deLocalizeHref, getLocale, locales, localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
	import './layout.css';

	const SITE_ORIGIN = 'https://genaitoolkit.dgcgreen.ca';
	const OG_LOCALE_MAP: Record<string, string> = { en: 'en_CA', fr: 'fr_CA' };

	let { children } = $props();

	let basePath = $derived(deLocalizeHref(page.url.pathname));
	let isAdmin = $derived(basePath.startsWith('/admin'));
	let currentLocale = $derived(getLocale());
	let ogImage = $derived(`${SITE_ORIGIN}/og_${currentLocale}.png`);
	let canonicalUrl = $derived(`${SITE_ORIGIN}${page.url.pathname}`);

	const descriptionByPath: Record<string, () => string> = {
		'/': m.desc_home,
		'/about': m.desc_about,
		'/calculator': m.desc_calculator,
		'/facts': m.desc_facts,
		'/faq': m.desc_faq,
		'/glossary': m.desc_glossary,
		'/guide': m.desc_guide
	};
	let description = $derived((descriptionByPath[basePath] ?? m.site_description)());

	onMount(() => {
		initCo2Tracker();
	});
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="32x32" />
	<link rel="icon" href="/icon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" /><!-- 180×180 -->
	{#if !isAdmin}
		<link rel="canonical" href={canonicalUrl} />
		{#each locales as locale (locale)}
			<link
				rel="alternate"
				hreflang={locale}
				href="{SITE_ORIGIN}{localizeHref(basePath, { locale })}"
			/>
		{/each}
		<link rel="alternate" hreflang="x-default" href="{SITE_ORIGIN}{localizeHref(basePath, { locale: 'en' })}" />

		<meta name="description" content={description} />

		<meta property="og:type" content="website" />
		<meta property="og:site_name" content={m.site_name()} />
		<meta property="og:title" content={m.title_home()} />
		<meta property="og:description" content={description} />
		<meta property="og:url" content={canonicalUrl} />
		<meta property="og:image" content={ogImage} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta property="og:image:alt" content={m.site_name()} />
		<meta property="og:locale" content={OG_LOCALE_MAP[currentLocale]} />
		{#each locales as locale (locale)}
			{#if locale !== currentLocale}
				<meta property="og:locale:alternate" content={OG_LOCALE_MAP[locale]} />
			{/if}
		{/each}

		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={m.title_home()} />
		<meta name="twitter:description" content={description} />
		<meta name="twitter:image" content={ogImage} />
		<meta name="twitter:image:alt" content={m.site_name()} />
	{/if}
</svelte:head>

<div class="min-h-svh bg-background text-text-primary">
	{#if isAdmin}
		{@render children()}
	{:else}
		<Navbar />
		<main class="mx-auto max-w-7xl px-6 py-10">
			{@render children()}
		</main>
		<Footer />
	{/if}
</div>

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={resolve(localizeHref(page.url.pathname, { locale }) as Pathname)}>{locale}</a>
	{/each}
</div>
