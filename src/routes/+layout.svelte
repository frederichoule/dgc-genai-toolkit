<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { deLocalizeHref, locales, localizeHref } from '$lib/paraglide/runtime';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	let isAdmin = $derived(deLocalizeHref(page.url.pathname).startsWith('/admin'));
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

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
