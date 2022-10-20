<script lang="ts">
	import type { Types } from 'openbooru';
	import PostInfo from 'lib/PostInfo/index.svelte';
	import Media from 'lib/Media/index.svelte';
	export let post: Types.Post;
</script>

<main>
	<div>
		<Media post={post}/>
	</div>
	<PostInfo {post} />
</main>

<style>
	main {
		height: 100%;
		overflow-y: scroll;
		display: grid;
		grid-template-rows: calc(100% - 1.5rem) 1fr;
	}

	div {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
</style>
