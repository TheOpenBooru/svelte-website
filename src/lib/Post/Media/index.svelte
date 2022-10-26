<script lang="ts">
  import type { Types } from "openbooru";
  import Image from "./image.svelte";
  import Video from "./video.svelte";
  export let post: Types.Post;
</script>

{#if post.full.type === "video"}
  <Video video={post.full} poster={post.thumbnail} />
{:else}
  <Image media={post.full}/>
{/if}
