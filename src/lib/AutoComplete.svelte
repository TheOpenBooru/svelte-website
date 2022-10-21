<script lang="ts">
  import type { Types } from "openbooru"
  import Tag from "./Tag.svelte"

  export const input: string = "";
  export const callback: (tag: string) => void = console.log;

  let tags: Types.Tag[] = []
</script>

{#if tags && tags.length === 0}
  <div>
    {#each tags as tag}
      <Tag tagName={tag.name} data={tag} callback={() => callback(tag.name)} />
    {/each}
  </div>
{/if}

<style>
  div {
    min-width: 8em;
    height: fit-content;
    gap: 0.1rem;
    padding: 0.2rem;

    background: var(--BACKGROUND-3);
    border: 0.2rem solid var(--BORDER-1);
    border-radius: 1rem;

    display: flex;
    flex-direction: column;
    align-items: baseline;
  }
</style>
