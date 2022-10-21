<script lang="ts">
	import type { Types } from 'openbooru';
	import { Post } from 'openbooru';
	import PostEdit from "lib/Post/PostEdit/index.svelte"
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

<div>
	{#if post}
		<span class="source">
			<Source source={post.source}/>
		</span>
	{/if}
	<div class="inner">
		{#if post}
		<Info post={post}/>
			<div>
				{#if editting}
					<PostEdit {post}/>
				{:else}
					<TagList tags={post.tags}/>
				{/if}
			</div>
		{/if}
		<Buttons editCallback={toggleEditting} deleteCallback={deleteCallback} />
	</div>
</div>

<style>
	div {
		display: grid;
		grid-template-rows: 1.2rem 1fr;

		position: relative;
		min-height: 14rem;
		background-color: var(--BACKGROUND-3);
	}
	.source {
		margin-right: 2rem;
		margin-left: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.inner {
		display: grid;
		grid-template-columns: 14rem 1fr 4rem;
		padding-bottom: 1rem;
	}

	@media (max-width: 30rem) {
		.inner {
			display: flex;
			flex-flow: column;
			align-items: center;
			justify-content: center;
		}
	}
</style>
