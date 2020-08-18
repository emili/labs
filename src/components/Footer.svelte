<script>
	import { _ } from "../services/i18n";
	import Link from "./parts/Link.svelte";
	import InlineSeparator from "./parts/InlineSeparator.svelte";

	export let aboutHref = $_("home.about.href");
	export let licenseHref = $_("home.license.href");
	export let copyright = $_({
		id: "home.copyright",
		values: { year: +new Date().getFullYear() }
	});
</script>

<style>
	div {
		bottom: 0;
		position: fixed;
	}
</style>

<footer>
	&nbsp;<div>
		<Link text={$_('home.about.text')} href={aboutHref} /><InlineSeparator />
		<Link text={$_('home.license.text')} href={licenseHref} /><InlineSeparator />
		<span>{copyright}</span>
	</div>
</footer>
