<script lang="ts" context="module">
	import { hide as hideSearch, toggle as toggleSearch } from "lib/SearchBox/index.svelte";
	// import { hide as hideCreate, toggle as toggleCreate } from "lib/CreateBox.svelte";
	// import { hide as hideImport, toggle as toggleImport } from "lib/ImportBox.svelte";

	export let hide = () => {
		hideSearch();
		// hideCreate();
		// hideImport();
	}
</script>

<script lang="ts">
	import type { Types } from "openbooru";
	import Button from "lib/Button.svelte";
	import ButtonsBox from "./ButtonsContainer.svelte";
	// import ImportBox from "lib/ImportBox.svelte";
	// import CreateBox from "lib/CreateBox.svelte";
	import SearchBox from "lib/SearchBox/index.svelte";
	import { getPermission, hasPermission } from "js/booru";

	export let query: Types.PostQuery;
	export let setQuery: (query: Types.PostQuery) => void;
</script>

<ButtonsBox position="right">
	<Button name="Searchbox" src="/images/search.svg" on:click={toggleSearch} />
	<!-- {#await hasPermission("canCreatePosts") then canCreatePosts}
		{#if canCreatePosts}
		<Button name="Create Post" src="/images/plus.svg" on:click={toggleCreate} />
		<Button name="Upload Post" src="/images/upload.svg" on:click={toggleImport} />
		{/if}
	{/await} -->
</ButtonsBox>

<SearchBox setQuery="{setQuery}" query="{query}" />
<!-- <ImportBox/>
<CreateBox/> -->
