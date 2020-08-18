<script>
	import Footer from "../components/Footer.svelte";
	import { isLocaleLoaded } from "../services/i18n";
</script>

{#if $isLocaleLoaded}
	<main>
		<slot />
	</main>
	<Footer />
{/if}
