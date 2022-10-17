<script lang="ts">
	import type { Types } from 'openbooru';
	import { BSL, Posts } from 'openbooru';
	import type { SvelteComponent } from 'svelte';
	import Search from 'js/search';
	import Grid from 'lib/Posts/Grid/index.svelte';
	import Button from 'lib/Button.svelte';
	import SearchBox from 'lib/SearchBox/index.svelte';
	import AutoComplete from 'lib/AutoComplete.svelte';

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

	let searchModal: HTMLDialogElement;
	function showSearch(){
		searchModal.showModal();
	}
	function hideSearch(){
		searchModal.close();
	}
</script>

<dialog bind:this={searchModal}>
	<SearchBox setQuery={updateQuery} closeCallback={hideSearch} {query} />
</dialog>

<div>
	<Button name="Search" src="/images/search.svg" callback={showSearch} />
</div>

<svelte:component
	this={layout}
	{requestPosts}
	{index}
	{finished}
	{loading}
	{posts}
	callback={PostCallback}
/>

<style>
	div {
		position: absolute;
		left: 0;
		margin: 0.2rem;
	}

	dialog::backdrop{
		background: rgba(0,0,0);
		opacity: 0.95;
		animation-name: fadeIn;
		animation-duration: 2s;
		animation-direction: forwards;
	}

	@keyframes fadeIn{
		from { opacity: 0.5;}
		to { opacity: 1;}
	}
	
	dialog {
		background: none;
		border: none;
	}
</style>
