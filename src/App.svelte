<script lang="ts">
	import { setupI18n, _, isLocaleLoaded } from "./services/i18n";

	setupI18n();

	export let place: string;
</script>

<main>
	{#if $isLocaleLoaded}
		<h1>{$_("app.welcome")} {$_(place)}</h1>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
	}

	h1 {
		text-transform: uppercase;
		font-size: 4em;
	}
</style>
