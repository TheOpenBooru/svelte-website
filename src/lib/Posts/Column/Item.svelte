<script lang="ts">
	import type { Types } from 'openbooru';
	import Image from 'lib/Media/image.svelte';
	export let index: number;
	export let post: Types.Post;
	export let postCallback: Function;
	export let isTarget: boolean = false;
	export let priority: boolean = false;

	const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

	let image = post.preview?.type === 'image' ? post.preview : post.thumbnail;
	image ??= post.thumbnail;

	let aspectRatio = clamp(image.height / image.width, 0.5, 2);
	let adjustedHeight = (image.height / aspectRatio) * aspectRatio;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	on:click={postCallback({ id: post.id, index })}
	on:load={isTarget ? () => scrollTo() : null}
	class={post.media_type}
>
	<a title={`Post: ${post.id}`} href={`/post/${post.id}`} on:click={(e) => e.preventDefault()}>
		<img
			src={image.url}
			width={image.width}
			height={adjustedHeight}
			alt={post.tags.join(", ")}
      loading={priority ? null : "lazy"}
		/>
	</a>
</div>

<style>
	div {
		display: block;
		height: auto;
		width: 100%;
		cursor: pointer;

		margin: 0.2rem;
		margin-bottom: 1rem;
		outline: 0.3rem solid;
		background: var(--BACKGROUND-3);
		outline-color: var(--BACKGROUND-3);
	}

	div .video {
		outline-color: #008600;
	}

	div .animation {
		outline-color: #000085;
	}

	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}

	div,
	img {
		transition: all 0.1s ease-in;
		border-radius: 1rem;
	}
  div:hover,
	img:hover {
    outline-width: 0.3rem;
    border-radius: 2rem;
  }
</style>
