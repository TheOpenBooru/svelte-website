<script lang="ts" context="module">
	import type { Types } from "openbooru"
	import SearchBox from "lib/SearchBox/index.svelte";
	import Button from 'lib/Button.svelte';

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

<script lang="ts">
	export let query: Types.PostQuery;
	export let setQuery: (query: Types.PostQuery) => void;
</script>

<div>
	<Button name="Search" src="/images/search.svg" callback={toggle} />
</div>

<dialog bind:this={searchModal}>
	<SearchBox {setQuery} closeCallback={hide} {query} />
</dialog>

<style>
	div {
		position: absolute;
		right: 1.2rem;
		margin: 0.4rem;
		z-index: 2;
	}

	dialog::backdrop{
		background: black;
		opacity: 0.95;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
	
	dialog {
		position: fixed;
		top: calc(var(--NAVBAR-HEIGHT) + 3rem);
		z-index: 1;
		background: none;
		border: none;
	}
</style>
