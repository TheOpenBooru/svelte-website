<script lang="ts">
	import type { Types } from "openbooru";
	import { afterUpdate } from "svelte";
	import { tagAutocomplete } from "js/booru";
	import Tag from "./Tag.svelte";

	export let input: string;
	export let callback: (tag: string) => void;
</script>

{#await tagAutocomplete(input, 8) then tags}
	{#if tags.length > 0}
		<div>
			{#each tags as tag}
				<Tag tagName="{tag.name}" data="{tag}" on:click="{() => callback(tag.name)}" />
			{/each}
		</div>
	{/if}
{/await}

<style>
	div {
		min-width: 8em;
		height: fit-content;
		padding: 0.2rem;

		background: var(--BACKGROUND-3);
		border: 0.2rem solid var(--BORDER-1);
		border-radius: 1rem;

		display: flex;
		flex-direction: column;
		align-items: baseline;
		gap: 0.5rem;
	}
</style>
