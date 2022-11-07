<script lang="ts">
	import { browser } from "$app/environment";
	import { generateUrl } from "js/proxy";
  import type { Types } from "openbooru";
	import { onMount, onDestroy } from "svelte";
  export let media: Types.Image;

  let zoomed = false;
  function keyDown(e: KeyboardEvent){
    if (e.key === "Control"){
      zoomed = true;
    }
  }

  function keyUp(e: KeyboardEvent){
    if (e.key === "Control"){
      zoomed = false;
    }
  }

  function mouseMove(e: MouseEvent){
    let { top, left, width, height } = elem.getBoundingClientRect();
    let xPercent = ((e.clientX + left) / width) - 0.5
    let yPercent = ((e.clientY + top) / height) - 0.5
    const translateScale = -100;
    style = `transform:
      translate(
        ${xPercent * translateScale}%,
        ${yPercent * translateScale}%
      );
    `
  }

  // onMount(() => {
  //   if (browser){
  //     document.body.addEventListener("keydown", keyDown)
  //     document.body.addEventListener("keyup", keyUp)
  //   }
  // })

  // onDestroy(() => {
  //   if (browser){
  //     document.body.removeEventListener("keydown", keyDown)
  //     document.body.removeEventListener("keyup", keyUp)
  //   }
  // })
  let style = "";
  let elem: Element;
</script>

{#if zoomed}
  <img
    class="zoom"
    style={style}
    on:mousemove={mouseMove}
    bind:this={elem}

    src={generateUrl(media.url)}
    width={media.width}
    height={media.height}
    alt=""
  />
{:else}
  <img
    src={generateUrl(media.url)}
    width={media.width}
    height={media.height}
    alt=""
    loading="eager"
  />
{/if}

<style>
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  img.zoom{
    object-fit: none;
    transform: translate(0%, 0%);
    overflow: hidden;
  }
</style>
