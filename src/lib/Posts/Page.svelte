<script lang="ts">
	import type { Types } from 'openbooru';
	import { BSL, Posts } from 'openbooru';
	import { onMount } from 'svelte';
	import { page } from "$app/stores"
	import { API_URL } from 'js/config';
	import Grid from 'lib/Posts/Grid/index.svelte';
	import Column from 'lib/Posts/Column/index.svelte';
	import SearchButton from './SearchButton.svelte';
	import LayoutSelector from './LayoutSelector.svelte';

	export let layout: "grid"|"column" = "grid";
	export let initialPosts: Types.Post[] = [];

	let finished = false;
	let loading = false;
	let index = 0;
	let posts: Types.Post[] = [];
	
	let params = $page.url.searchParams
	let bsl = params.get("query") || "";
	if (typeof bsl === "object") bsl = bsl[0]
	const query = BSL.decode(bsl);

	async function requestPosts() {
		if (finished || loading) return;
		loading = true;

		const limit = 100;
		let new_posts;
		try {
			new_posts = await Posts.search(
				query,
				posts.length,
				limit, {
					apiUrl: API_URL
				});
		} catch (e) {
			return;
		}

		posts = posts.concat(new_posts);

		loading = false;
	}

	function setQuery(query: Types.PostQuery) {
		window.location.search = "?query=" + BSL.encode(query)
	}

	interface PostCallbackInterface{
		id: number,
		index: number,
	}
	function PostCallback({ id, index }: PostCallbackInterface) {
		return () => {
			location.href = `/post/${id}`;
		};
	}
	
	function setIndex(new_index: number){
		index = new_index;
	}

	const LayoutLookup = {
		grid:Grid,
		column: Column
	};
	const LayoutElement = LayoutLookup[layout] ?? Grid
</script>

<SearchButton {query} {setQuery}/>
<LayoutSelector layout={layout}/>
<svelte:component
	this={LayoutElement}
	{index}
	{setIndex}
	{finished}
	{loading}
	posts={posts || initialPosts}
	{requestPosts}
	callback={PostCallback}
/>