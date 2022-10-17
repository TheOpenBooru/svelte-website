<script lang="ts">
	import type { Types } from 'openbooru';
	import PostInfo from 'lib/PostInfo/index.svelte';
	export let post: Types.Post;
</script>

<main>
	{#if post.media_type === 'video'}
		<video
			id="media"
			src={post.full.url}
			width={post.full.width}
			height={post.full.height}
			alt={post.tags.join(', ')}
			controls
		>
		</video>
	{:else}
		<img
			id="media"
			src={post.full.url}
			width={post.full.width}
			height={post.full.height}
			alt={post.tags.join(', ')}
		/>
	{/if}
	<PostInfo {post} />
</main>

<style>
	main {
		height: var(--PAGE-HEIGHT);
		overflow-y: scroll;
		display: grid;
		grid-template-rows: calc(100% - 1.5rem) 1fr;
	}

	#media {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
</style>
