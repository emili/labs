<script>
	import { _ } from "../services/i18n";
	import Link from "./parts/Link.svelte";

	export let aboutHref = $_("home.about.href");
	export let licenseHref = $_("home.license.href");
</script>

<style>
	footer {
		border-top: 1px solid #c0c0c0;
		bottom: 0;
		display: inline-flex;
		flex-direction: row;
		column-gap: 2rem;
		height: 2rem;
		line-height: 2rem;
		padding-left: 1rem;
		padding-right: 1rem;
		position: fixed;
		width: 100%;
	}
</style>

<footer>
	<Link text={$_('home.about.text')} href={aboutHref} />
	<Link text={$_('home.license.text')} href={licenseHref} />
</footer>
