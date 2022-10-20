<script lang="ts">
  import type { Types } from "openbooru";
  import Image from "./image.svelte";
  import Video from "./video.svelte";
  import Animation from "./animation.svelte";
  export let post: Types.Post;

  
</script>

{#if post.full.type === "video"}
  <Video video={post.full} poster={post.thumbnail} />
{:else if post.media_type === "animation"}
  <Animation media={post.full}/>
{:else}
  <Image media={post.full}/>
{/if}
