<script lang="ts">
	import type { Types } from "openbooru";
	import { generateUrl } from "js/proxy";
	export let video: Types.Video;
	export let poster: Types.Image | null = null;

	let videoElement: HTMLVideoElement;

	function updateVolume() {
		let volume = videoElement.volume;
		localStorage.setItem("video-volume", volume.toString());
	}

	function setVolume() {
		let volume = localStorage.getItem("video-volume");
		videoElement.volume = Number(volume);
	}
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video
	bind:this="{videoElement}"
	on:load="{setVolume}"
	on:volumechange="{updateVolume}"
	poster="{generateUrl(poster?.url)}"
	preload="auto"
	controls
	loop
>
	<source
		src="{generateUrl(video.url)}"
		width="{video.width}"
		height="{video.height}"
		type="{video.mimetype}"
	/>
</video>

<style>
	video {
		width: 100%;
		height: 100%;
		object-fit: contain;
		background-color: black;
	}
</style>
