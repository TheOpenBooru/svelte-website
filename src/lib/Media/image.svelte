<script lang="ts">
  import type { Types } from "openbooru";
  export let media: Types.Image;
</script>

<img
  src={media.url}
  width={media.width}
  height={media.height}
  alt=""
/>

<style>
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
