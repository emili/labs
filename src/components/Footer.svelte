<script>
	import { _ } from "../services/i18n";
	import Link from "./parts/Link.svelte";
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
	<Link text={$_('home.about.text')} href={$_('home.about.href')} />
	<Link text={$_('home.license.text')} href={$_('home.license.href')} />
	<Link text={$_('home.privacy.text')} href={$_('home.privacy.href')} />
</footer>
