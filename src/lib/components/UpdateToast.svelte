<script lang="ts">
	import { updated } from '$app/state';
	import { m } from '$lib/paraglide/messages.js';

	function reload() {
		location.reload();
	}
</script>

{#if updated.current}
	<div
		role="status"
		aria-live="polite"
		class="fixed bottom-4 left-4 z-50 flex items-center gap-4 rounded-lg border border-white/15 bg-background-soft/95 px-4 py-3 text-sm text-text-primary shadow-lg backdrop-blur"
	>
		<span>{m.toast_update_available()}</span>
		<button
			type="button"
			onclick={reload}
			class="rounded-sm font-medium text-brand-lime underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime"
		>
			{m.toast_update_reload()}
		</button>
	</div>
{/if}
