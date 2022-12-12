<script lang="ts">
	import { normaliseTag } from "js/utils";
	import AutoComplete from "lib/AutoComplete.svelte";
	export let includeTags: string[];

	let text = "";

	function normaliseText() {
		text = normaliseTag(text);
	}

	function keyPressHandler(e: KeyboardEvent) {
		if (e.key === "Enter") {
			addTag(text);
		}
	}

	function addTag(tag: string) {
		text = "";
		if (tag && !includeTags.includes(tag)) {
			includeTags = includeTags.concat(tag);
		}
	}
</script>

<input
	type="search"
	bind:value="{text}"
	on:input="{normaliseText}"
	on:keypress="{keyPressHandler}"
/>
<div>
	<AutoComplete input="{text}" callback="{addTag}" />
</div>

<style>
	input {
		width: 100%;
		border-radius: 0.5rem;
		justify-self: flex-start;
	}

	div {
		z-index: 1;
		position: absolute;
		top: 3.2rem;
		left: 10.2rem;
	}
</style>
