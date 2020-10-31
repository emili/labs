<script lang="ts">
  import "../../utils";
  import { _, locale } from "../../services/i18n";

  import Spinner from "../../components/parts/Spinner.svelte";

  const language = $locale as Emili.Languages;
  let entries: Emili.Labs.Configuration.DynamicsCompanion.EntryManifest[] = [];

  async function retrieveConfigFile(): Promise<void> {
    try {
      const response = await fetch("/config/dyncom.json");
      if (response.ok) {
        entries = (await response.json()) as Emili.Labs.Configuration.DynamicsCompanion.EntryManifest[];
      }
    } catch {}
  }
</script>

<style>
  input[type="radio"]:checked + label > .area-content {
    display: block;
  }

  .area-content {
    counter-reset: area;
    display: none;
    left: 0;
    overflow: hidden;
    position: absolute;
    width: 100%;
  }

  .area-content li {
    background: #15a4fa;
    box-shadow: 0px 0px #126ca1 inset;
    left: -100%;
    opacity: 0;
    padding: 25px 0px;
    position: relative;
    text-indent: 25px;
    transition: box-shadow 0.3s, text-indent 0.3s;
    width: 100%;
  }

  input[type="radio"] {
    display: none;
  }

  label {
    box-sizing: border-box;
    border-bottom: 1px solid #293649;
    color: #eff4fa;
    float: left;
    height: 72px;
    padding: 25px;
    position: relative;
    transition: text-indent 0.15s, height 0.3s;
    width: 100%;
  }

  label > div.lil_arrow {
    border-top: 2px solid white;
    border-right: 2px solid white;
    width: 5px;
    height: 5px;
    transition: transform 0.8s;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    float: right;
    position: relative;
    top: 6px;
    right: 2px;
    transform: rotate(45deg);
  }

  label:hover .bar {
    width: 100%;
  }

  li {
    list-style: none;
  }

  input[type="radio"]:checked + label .bar {
    width: 0;
  }

  input[type="radio"]:checked + label > .lil_arrow {
    transition: transform 0.8s;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transform: rotate(135deg);
    border-top: 2px solid rgb(20, 163, 249);
    border-right: 2px solid rgb(20, 163, 249);
  }

  input[type="radio"]:checked + label li {
    animation: in 0.15s forwards;
    animation-delay: calc((+counter(area) * 0.125s) + 0.575s); /*warning*/
    counter-increment: area;
  }

  ul {
    background: #2a394f;
    margin: 0;
    padding: 0;
  }

  /* input[type="radio"]:checked + label li:nth-of-type(1) {
		animation-delay: 0.575s;
	}
	input[type="radio"]:checked + label li:nth-of-type(2) {
		animation-delay: 0.7s;
	}
	input[type="radio"]:checked + label li:nth-of-type(3) {
		animation-delay: 0.825s;
	}
	input[type="radio"]:checked + label li:nth-of-type(4) {
		animation-delay: 0.95s;
	} */
</style>

{#await retrieveConfigFile()}
  <div class="center-block">
    <Spinner />
    <span>{$_('app.loading')}</span>
  </div>
{:then}
  <ul role="tablist">
    {#each entries.groupBy((entry) => entry.area) as area, i}
      {#if area}
        <li>
          <input type="radio" name="areas" id="area{i}" />
          <label for="area{i}">
            <img href="" alt={$_('dyncom.areas.' + i)} />
            <span>{$_('dyncom.areas.' + i)}</span>
            <div class="lil_arrow" />
            <div class="bar" />
            <div id="area-content{i}" class="area-content">
              <ul>
                {#each area as x}
                  <li>
                    <img src="" alt={x.title[language]} />
                    <span>{x.title[language]}</span>
                    <span>{x.description[language]}</span>
                  </li>
                {/each}
              </ul>
            </div>
          </label>
        </li>
      {/if}
    {/each}
  </ul>
{/await}
