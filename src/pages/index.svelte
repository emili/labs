<script lang="ts">
  import { _ } from "../services/i18n";
  import Menu from "../components/Menu.svelte";
</script>

<svelte:head>
  <title>{$_('home.labs.title')} - {$_('app.title')}</title>
</svelte:head>

<Menu />
