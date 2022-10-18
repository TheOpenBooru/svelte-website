<script lang="ts">
	import type { Types } from "openbooru";
  import Item from "./Item.svelte"

  export let posts: Types.Post[];
  export let callback: Function;
</script>

<div>
    {#each posts as post, index}
      <Item
        {index}
        {post}
        priority={index < 5}
        postCallback={callback({ id: post.id, index })}
      />
  {/each}
</div>

<style>
	div {
    --IMAGE-WIDTH: 300px;
    --IMAGE-MARGIN: 8px;

    width: var(--IMAGE-WIDTH);
    margin: var(--IMAGE-MARGIN);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
	}
</style>