<script lang="ts">
	import Footer from "../components/Footer.svelte";
	import { _, isLocaleLoaded } from "../services/i18n";

	$: if ($isLocaleLoaded) {
		document.title = $_("home.labs.title") + " - " + $_("app.title");
	}
</script>

<style>
	main {
		bottom: 0;
		position: absolute;
		left: 0;
		margin-bottom: 2rem;
		overflow-x: hidden;
		right: 0;
		top: 0;
	}
</style>

<svelte:head>

	{#if $isLocaleLoaded}
		<meta name="description" content="Emili García Almazán" />
	{/if}
</svelte:head>
{#if $isLocaleLoaded}
	<main>
		<slot />
	</main>
	<Footer />
{/if}
