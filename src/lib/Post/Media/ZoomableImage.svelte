<script lang="ts">
	import { generateUrl } from "js/proxy";
  import type { Types } from "openbooru";
  export let media: Types.Image;

  let zoomed = false;
  const zoomIn = () => zoomed = true;
  const zoomOut = () => zoomed = false;
</script>

<div
  data-zoom={zoomed}
  on:click={zoomed ? zoomOut : zoomIn}
>
  <img
    src={generateUrl(media.url)}
    alt=""
    width={media.width}
    height={media.height}
    loading="eager"
  />
</div>

<style>
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  div[data-zoom="true"]>img{
    height: unset;
    overflow-y: scroll;
  }

  div[data-zoom="false"]{
    display: contents;
    cursor: zoom-in;
  }
  div[data-zoom="true"]{
    cursor: zoom-out;

    display: block;
    height: 100%;
    overflow-y: auto;
    --MARGIN: 25%;
    margin-left: var(--MARGIN);
    margin-right: var(--MARGIN);
  }
</style>
