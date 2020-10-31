<script lang="ts">
  import { locale } from "../services/i18n";

  import Svg from "./parts/Svg.svelte";
  import Card, { Content, PrimaryAction } from "@smui/card";

  export let entry: Emili.Labs.Configuration.EntryManifest;

  const language = $locale as Emili.Languages;
</script>

<style>
  .content {
    display: grid;
    grid-gap: 0.75rem;
    grid-template-rows: auto auto;
    margin-top: -100%;
  }
  /* 
	.content :global(svg) {
	} */
</style>

<div class="card-container" role="menuitem">
  <Card
    class="mdc-card-elevated"
    style="background:{entry.backColor};color:{entry.foreColor};">
    <PrimaryAction>
      <Content>
        <div class="relative square">
          <div class="content">
            {#if entry.iconUrl}
              <Svg src={entry.iconUrl} />
            {/if}
            <span>{entry.title[language]}</span>
          </div>
        </div>
      </Content>
    </PrimaryAction>
  </Card>
</div>
