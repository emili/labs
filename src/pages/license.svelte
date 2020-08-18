<script lang="ts">
	import { _ } from "../services/i18n";
	import Svg from "../components/parts/EmbeddedSvg.svelte";
</script>
<svelte:head>
	<title>{$_('home.license.text')} - {$_('app.title')}</title>
</svelte:head>

<h1>{$_('home.license.name')}</h1>
<h3>
	{$_({ id: 'home.copyright', values: { year: +new Date().getFullYear() } })}
</h3>

{#each $_('home.license.content').split('\n') as paragraph}
	<p>{paragraph}</p>
{/each}

<Svg src="/img/license.svg" />
