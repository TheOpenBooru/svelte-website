<script lang="ts">
	import type { Types } from "openbooru";
	import { generateUrl } from "js/proxy";
	import Links from "js/links";

	export let index: number;
	export let post: Types.Post;
	export let postCallback: () => void;
	export let isTarget: boolean = false;
	export let priority: boolean = false;

	const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

	let image = post.preview?.type === "image" ? post.preview : post.thumbnail;
	image ??= post.thumbnail;

	let aspectRatio = image.height / image.width;
	let adjustedAspectRatio = clamp(aspectRatio, 0.5, 2);
	let adjustedHeight = (image.height / aspectRatio) * adjustedAspectRatio;
	let aspectRatioStyle = `aspect-ratio: ${image.width}/${adjustedHeight}`;
</script>

<a
	title="Post: {post.id}"
	href="{Links.post(post.id)}"
	class="{post.full.type}"
	style="{aspectRatioStyle}"
	on:load="{isTarget ? () => scrollTo() : null}"
	on:click="{e => {
		e.preventDefault();
		postCallback({ id: post.id, index });
	}}"
>
	<img
		src="{generateUrl(image.url)}"
		width="{image.width}"
		height="{image.height}"
		alt="{post.tags.join(', ')}"
		loading="{priority ? null : 'lazy'}"
	/>
</a>

<style>
	a {
		display: block;
		height: auto;
		width: 100%;
		cursor: pointer;

		margin: 0.2rem;
		outline: 0.3rem solid;
		background: var(--BACKGROUND-3);
	}

	a.image {
		outline-color: var(--BACKGROUND-3);
	}

	a.video {
		outline-color: #008600;
	}

	a.animation {
		outline-color: #000085;
	}

	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
	a,
	img {
		border-radius: 1rem;
	}
	a:hover,
	img:hover {
		outline-width: 0.3rem;
		border-radius: 2rem;
	}
</style>
