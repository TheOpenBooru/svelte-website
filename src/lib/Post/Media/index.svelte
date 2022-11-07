<script lang="ts">
  import type { Types } from "openbooru";
  import Image from "./image.svelte";
  import Video from "./video.svelte";
  export let post: Types.Post|null;
</script>

{#if post}
  {#if post.type === "video"}
    <Video video={post.full} poster={post.thumbnail} />
  {:else}
    <Image media={post.full}/>
  {/if}
{/if}