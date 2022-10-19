<script lang="ts" context="module">
	import type { Types } from "openbooru"
	import SearchBox from "lib/SearchBox/index.svelte";
	import Button from 'lib/Button.svelte';

	export let query: Types.PostQuery;
	export let updateQuery: (query: Types.PostQuery) => void;

	export function toggle(){
		if (searchModal.open) {
			searchModal.close();
		} else {
			searchModal.show();
		}
	}

	export function hide(){
		searchModal.close();
	}
	let searchModal: HTMLDialogElement;
</script>

<div>
	<Button name="Search" src="/images/search.svg" callback={toggle} />
</div>

<dialog bind:this={searchModal}>
	<SearchBox setQuery={updateQuery} closeCallback={hide} {query} />
</dialog>

<style>
	div {
		position: absolute;
		left: 0;
		margin: 0.4rem;
		z-index: 1;
	}

	dialog::backdrop{
		background: rgba(0,0,0);
		opacity: 0.95;
	}
	
	dialog {
		z-index: 1;
		background: none;
		border: none;
	}
</style>
