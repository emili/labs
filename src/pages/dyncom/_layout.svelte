<script lang="ts">
  const globalOptions = getLoaderOptions();

  type GlobalOptions = {
    fromBookmarklet: boolean;
    channel: "alpha" | "beta" | "release";
    isConnected?: boolean;
    context?: Emili.Labs.Configuration.DynamicsCompanion.ExecutionContext;
  };

  function getLoaderOptions(): GlobalOptions {
    const hash = window.location.hash || "";
    return {
      fromBookmarklet: hash.includes("bookmarklet"),
      channel: hash.includes("alpha")
        ? "alpha"
        : hash.includes("beta")
        ? "beta"
        : "release",
    };
  }
</script>

<slot />
