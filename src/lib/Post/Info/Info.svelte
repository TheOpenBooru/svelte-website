<script lang="ts">
	import type { Types } from "openbooru";
	import Votes from "./Votes.svelte";
	import titleCase from "ap-style-title-case";
	export let post: Types.Post;

	let created_at = new Date(post.created_at * 1000).toDateString();
	let rating = titleCase(post.rating);
</script>

<div>
	<span>{created_at} - {rating}</span>
	<Votes post="{post}" />
</div>

<style>
	div {
		height: fit-content;
		width: fit-content;
		padding: 0.5rem;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
