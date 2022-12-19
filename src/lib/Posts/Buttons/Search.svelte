<script lang="ts" context="module">
	import { hide as _hide, toggle as _toggle } from "lib/SearchBox/index.svelte";

	export let toggle = _toggle;
	export let hide = _hide;
</script>

<script lang="ts">
	import type { Types } from "openbooru";
	import Button from "lib/Button.svelte";
	import SearchBox from "lib/SearchBox/index.svelte";

	export let query: Types.PostQuery;
	export let setQuery: (query: Types.PostQuery) => void;
</script>

<div>
	<Button name="Search" src="/images/search.svg" callback="{_toggle}" />
</div>

<SearchBox setQuery="{setQuery}" closeCallback="{hide}" query="{query}" />

<style>
	div {
		position: absolute;
		right: 0;
		margin: 0.4rem;
		z-index: 2;
	}
</style>
