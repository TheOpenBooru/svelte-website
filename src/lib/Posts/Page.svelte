<script lang="ts">
	import type { Types } from 'openbooru';
	import { BSL, Posts } from 'openbooru';
	import { onMount } from 'svelte';
	import Grid from 'lib/Posts/Grid/index.svelte';
	import Column from 'lib/Posts/Column/index.svelte';
	import SearchButton from './SearchButton.svelte';
	import LayoutSelector from './LayoutSelector.svelte';

	export let layout: "grid"|"column" = "grid";
	export let initialPosts: Types.Post[] = [];

	let finished = false;
	let loading = false;
	let index = 0;
	let query: Types.PostQuery = {};
	let posts: Types.Post[] = [];


	async function postQueryFromParams(){
		let params = new URLSearchParams(window.location.search)
    let bsl = params.get("query") || "";
    if (typeof bsl === "object") bsl = bsl[0]
    let query = BSL.decode(bsl);
		updateQuery(query);
	}

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
	
	const LayoutLookup = {
		grid:Grid,
		column: Column
	};
	const LayoutElement = LayoutLookup[layout] ?? Grid
	onMount(postQueryFromParams)
</script>

<SearchButton {query} {updateQuery}/>
<LayoutSelector layout={layout}/>
<svelte:component
	this={LayoutElement}
	{index}
	{finished}
	{loading}
	posts={posts || initialPosts}
	{requestPosts}
	callback={PostCallback}
/>