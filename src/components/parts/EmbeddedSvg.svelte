<script lang="ts">
	import { _, isLocaleLoaded } from "../../services/i18n";

	export let src: string;
	export let accentColor: string = $_("app.accent");
</script>

{#if $isLocaleLoaded}
	{#await fetch(src) then response}
		{#await response.text() then image}
			{@html `<style>.accent{fill:${accentColor}}</style>`}
			{@html image}
		{/await}
	{/await}
{/if}
