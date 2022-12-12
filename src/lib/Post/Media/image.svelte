<script lang="ts">
	import type { Types } from "openbooru";
	import { browser } from "$app/environment";
	import { generateUrl } from "js/proxy";
	import ZoomableImage from "./ZoomableImage.svelte";
	export let media: Types.Image;

	let aspectRatio = Math.max(media.height / media.width, media.width / media.height);
</script>

{#if aspectRatio > 4}
	<ZoomableImage media="{media}" />
{:else}
	<img
		src="{generateUrl(media.url)}"
		alt=""
		width="{media.width}"
		height="{media.height}"
		loading="eager"
	/>
{/if}

<style>
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
</style>
