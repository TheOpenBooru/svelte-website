<script lang="ts">
	export let query: Types.PostQuery = {};
	export let setQuery: Function;
	export let closeCallback: Function;

	import type { Types } from 'openbooru';
	import SortSelect from './SortSelect.svelte';
	import OrderButton from './OrderButton.svelte';
	import TagSearch from './TagSearch.svelte';

	let sort: Types.Sort;
	let descending: boolean;
	let includeTags: string[];
	let excludeTags: string[];

	function saveQuery() {
		let NewQuery: Types.PostQuery = {};
		if (sort !== undefined) NewQuery['sort'] = sort;
		if (descending !== undefined) NewQuery['descending'] = descending;
		if (includeTags !== undefined) NewQuery['include_tags'] = includeTags;
		if (excludeTags !== undefined) NewQuery['exclude_tags'] = excludeTags;
		setQuery(NewQuery);
	}

	function addTagCallback(tag: string) {
		if (tag && !includeTags.includes(tag)) {
			includeTags = includeTags.concat(tag);
		}
	}
</script>

<div class="container">
	<div class="top">
		<SortSelect {sort} />
		<OrderButton {descending} />
		<TagSearch {addTagCallback} />
	</div>
	<!-- <TagList
        includeTags={includeTags}
        setIncludeTags={setIncludeTags}
        excludeTags={excludeTags}
        setExcludeTags={setExcludeTags}
    /> -->
	<button class="search-button" on:click={saveQuery}> Search </button>
</div>

<style>
	.container {
		/* Position */
		aspect-ratio: 16/9;
		min-height: 15rem;
		min-width: 15rem;
		width: min(50vw, 30rem);

		display: flex;
		flex-direction: column;
		justify-content: space-between;

		/* Look */
		background-color: var(--BACKGROUND-3);
		border: 0.2em solid var(--BORDER-1);
		border-radius: 1rem;
	}

	.top {
		border-bottom: 0.2em solid var(--BORDER-1);
		display: flex;
		padding: 0.2rem;

		align-items: center;
		justify-content: space-around;
	}
	.top > * {
		margin: 0.2rem;
	}

	.search-button {
		width: 100%;
		height: 2.5rem;
		min-height: 1rem;
		border-radius: 0 0 0.9rem 0.9rem;

		border-width: 0;
		border-top: 0.2em solid var(--BORDER-1);
		background-color: var(--BACKGROUND-2);
		font-weight: bold;
	}
	.search-button:active {
		background-color: var(--BACKGROUND-4);
		font-size: 1.1rem;
	}
</style>
