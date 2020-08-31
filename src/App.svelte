<script lang="ts">
  import { setupI18n } from "./services/i18n";

  import { Router } from "@sveltech/routify";
  import { routes } from "@sveltech/routify/tmp/routes";

  setupI18n();
</script>

<style global>
  body {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
  }

  svg,
  .accent {
    color: #00b0ff;
  }

  .center-block {
    left: 50%;
    margin: 0;
    position: absolute;
    text-align: center;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .center-block-x-content > * {
    display: block;
    margin: 0 auto;
  }
</style>

<Router {routes} />
