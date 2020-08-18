<script lang="ts">
	import { setupI18n } from "./services/i18n";

	import { Router } from "@sveltech/routify";
	import { routes } from "@sveltech/routify/tmp/routes";

	setupI18n();
</script>

<style>
	:global(body) {
		margin: 0;
	}
</style>

<Router {routes} />
