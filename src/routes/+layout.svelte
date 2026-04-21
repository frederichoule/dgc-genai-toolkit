<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { Pathname } from '$app/types';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { initCo2Tracker } from '$lib/client/co2Tracker';
	import { deLocalizeHref, locales, localizeHref } from '$lib/paraglide/runtime';
	import './layout.css';

	let { children } = $props();

	let isAdmin = $derived(deLocalizeHref(page.url.pathname).startsWith('/admin'));

	onMount(() => {
		initCo2Tracker();
	});
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="32x32" />
	<link rel="icon" href="/icon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" /><!-- 180×180 -->
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
