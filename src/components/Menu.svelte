<script lang="ts">
	import { _ } from "../services/i18n";
	
	import MenuEntry from "./MenuEntry.svelte";
	import Spinner from "./parts/Spinner.svelte";

	let entries: Emili.Labs.Configuration.EntryManifest[] = [];

	async function retrieveConfigFile(): Promise<void> {
		try {
			const response = await fetch("/config/labs.json");
			if (response.ok) {
				entries = (await response.json()) as Emili.Labs.Configuration.EntryManifest[];
			}
		} catch {}
	}
</script>

<style>
	div[role="menu"] {
		/* column-gap: .75rem; */
		display: grid;
		grid-auto-flow: dense;
		grid-gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(128px, max-content));
	}
</style>

{#await retrieveConfigFile()}
	<div class="center-block">
		<Spinner />
		<span>{$_('app.loading')}</span>
	</div>
{:then}
	<div role="menu">
		{#each entries as entry}
			<MenuEntry {entry} />
		{:else}
			<span>No entries found</span>
		{/each}
	</div>
{/await}
