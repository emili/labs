<script lang="ts">
  export let src: string;
</script>

{#await fetch(src) then response}
  {#await response.ok && response.text() then image}
    {@html image}
  {/await}
{/await}
