<script lang="ts">
	import type { Types } from "openbooru";
	import { BSL } from "openbooru";
	import { page } from "$app/stores";

	import { posts_search } from "js/booru";
	import Links from "js/links";
	import Grid from "lib/Posts/Grid/index.svelte";
	import Column from "lib/Posts/Column/index.svelte";
	import SearchButton from "./Buttons/Search.svelte";
	import LayoutSelector from "./LayoutSelector.svelte";

	export let layout: "grid" | "column" = "grid";
	export let initialPosts: Types.Post[] = [];

	let finished = false;
	let loading = false;
	let posts: Types.Post[] = [];

	$: params = $page.url.searchParams;
	$: bsl = params.get("query") || "";
	if (typeof bsl === "object") bsl = bsl[0];
	$: query = BSL.decode(bsl);

	async function requestPosts() {
		if (finished || loading) return;
		loading = true;

		const limit = 100;
		let new_posts;
		try {
			new_posts = await posts_search(query, posts.length, limit);
		} catch (e) {
			return;
		}

		// Helps to test loading
		// if (import.meta.env.DEV){
		// 	await new Promise(resolve => setTimeout(resolve, 2000))
		// }
		posts = posts.concat(new_posts);
		loading = false;
	}

	function setQuery(query: Types.PostQuery) {
		let bsl = BSL.encode(query);
		let search = bsl ? "?query=" + bsl : "";
		window.location.search = search;
	}

	interface PostCallbackInterface {
		id: number;
		index: number;
	}
	function PostCallback({ id, index }: PostCallbackInterface) {
		return () => {
			location.href = Links.post(id);
		};
	}

	const LayoutLookup = {
		grid: Grid,
		column: Column,
	};
	const LayoutElement = LayoutLookup[layout] ?? Grid;
</script>

<SearchButton query="{query}" setQuery="{setQuery}" />
<LayoutSelector layout="{layout}" />
<svelte:component
	this="{LayoutElement}"
	finished="{finished}"
	loading="{loading}"
	posts="{posts || initialPosts}"
	requestPosts="{requestPosts}"
	callback="{PostCallback}"
/>
