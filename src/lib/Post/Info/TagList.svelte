<script lang="ts">
	import type { Types } from "openbooru";
	import { BSL } from "openbooru";
	import Tag from "lib/Tag.svelte";
	export let tags: string[] = [];
	tags.sort();

	function create_link(tag: string) {
		let query: Types.PostQuery = { include_tags: [tag] };
		let bsl = BSL.encode(query);
		let href = `/posts/?query=${bsl}`;
		return href;
	}
</script>

<div>
	{#each tags as tag}
		<Tag tagName="{tag}" href="{create_link(tag)}" />
	{/each}
</div>

<style>
	div {
		position: relative;
		height: fit-content;
		width: 100%;

		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-content: baseline;
		gap: 0.5rem;
	}
</style>
