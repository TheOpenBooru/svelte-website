<script lang="ts">
	import type { Types } from 'openbooru';
	import Image from 'lib/Media/image.svelte';
	export let post: Types.Post;
	export let callback: Function;
	export let priority: boolean;

	let image = post.thumbnail;
	let loaded = false;
</script>

<a
	class="border"
	href="/post/{post.id}"
	on:click={(e) => {e.preventDefault(); callback(e)}}
>
	<img
		class="border"
		src={image.url}
		alt="Post {post.id} {post.tags.join(',')}"
		width={image.width}
		height={image.height}
		loading={priority ? "eager" : "lazy"}
	/>
</a>

<style>
	a {
		--MAX-SIZE: var(--IMAGE-SIZE);
		--MIN-SIZE: calc(var(--IMAGE-SIZE) / 6);

		min-width: var(--MIN-SIZE);
		min-height: var(--MIN-SIZE);
		max-width: var(--MAX-SIZE);
		max-height: var(--MAX-SIZE);
		display: flex;
		justify-content: center;
		align-items: center;

		background: var(--BACKGROUND-3);
		outline: 0.3rem solid var(--BACKGROUND-3);
	}
	
	.loading {
		opacity: 0;
	}
	
	.loaded {
		transition: ease-in-out 100ms;
		opacity: 1;
	}

	img {
		background: var(--BACKGROUND-3);
		cursor: pointer;
		height: var(--IMAGE-SIZE);
		width: 100%;
		object-fit: cover;
	}

	.border {
		border-radius: 1rem;
	}

	.border:hover {
		transition: 0.2s all ease-out;
		border-color: var(--BACKGROUND-3-HOVER);
		border-radius: calc(var(--IMAGE-SIZE) / 5);
	}
</style>
