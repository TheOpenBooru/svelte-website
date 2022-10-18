<script lang="ts">
	import type { Types } from 'openbooru';
	import { BSL, Posts } from 'openbooru';
	import Grid from 'lib/Posts/Grid/index.svelte';
	import SearchButton from './SearchButton.svelte';

	export let layout = Grid;

	let finished = false;
	let loading = false;
	let index = 0;
	let query: Types.PostQuery = {};
	let posts: Types.Post[] = [];

	async function requestPosts() {
		if (finished || loading) return;
		loading = true;

		const limit = 100;
		let new_posts;
		try {
			new_posts = await Posts.search(query, index, limit);
		} catch (e) {
			return;
		}

		index = index + new_posts.length;
		posts = posts.concat(new_posts);

		loading = false;
	}

	async function updateQuery(query: Types.PostQuery) {
		index = 0;
		finished = false;
		loading = false;
		query = query;
		posts = [];
	}

	interface PostCallbackParams {
		id: number;
		index: number;
	}

	function PostCallback({ id, index }: PostCallbackParams) {
		return () => {
			location.href = `/post/${id}`;
		};
	}
</script>

<SearchButton {query} {updateQuery}/>

<svelte:component
	this={layout}
	{index}
	{finished}
	{loading}
	{posts}
	{requestPosts}
	callback={PostCallback}
/>
