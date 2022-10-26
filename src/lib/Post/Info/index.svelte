<script lang="ts">
	import type { Types } from 'openbooru';
	import { Post } from 'openbooru';
	import PostEdit from "lib/Post/Edit/index.svelte"
	import Source from "./Source.svelte"
	import Info from "./Info.svelte"
	import TagList from "./TagList.svelte"
	import Buttons from "./Buttons.svelte"

	export let post: Types.Post|null;

	let editting = false;
	const deleteCallback = async () => {
		await Post.Delete(post.id);
		window.location.reload();
	};

	function toggleEditting(){
		editting = !editting;
	}
</script>

<div id="main">
	{#if post}
		<span id="source">
			<Source source={post.source}/>
		</span>
	{/if}
	<div id="inner">
		{#if post}
			<Info post={post}/>
			{#if editting}
				<PostEdit {post}/>
			{:else}
				<TagList tags={post.tags}/>
			{/if}
		{/if}
		<Buttons editCallback={toggleEditting} deleteCallback={deleteCallback} />
	</div>
</div>

<style>
	div#main {
		display: grid;
		grid-template-rows: 1.2rem 1fr;
		
		position: relative;
		height: fit-content;
		min-height: 14rem;
		background-color: var(--BACKGROUND-3);
	}

	#source {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	div#inner {
		display: grid;
		grid-template-columns: 14rem 1fr 4rem;
		padding-bottom: 1rem;
	}

	@media screen and (max-width: 40rem), (orientation: portrait){
		div#inner {
			display: flex;
			flex-flow: column;
			align-items: center;
			justify-content: center;
		}
	}
</style>
