<script lang="ts">
	import { normaliseTag } from "js/utils";
	import AutoComplete from "lib/AutoComplete.svelte";

	export let callback: (tag: string) => void;
	let text: string;

	function normaliseText() {
		text = normaliseTag(text);
	}
	function onKeyPress() {
		if (e.code === "Enter" && text !== "") {
			addTag(text);
		}
	}

	function addTag(tag: string) {
		text = "";
		callback(tag);
	}
</script>

<div id="container">
	<input type="text" bind:value="{text}" on:keypress="{onKeyPress}" on:change="{normaliseText}" />
	<button on:click="{() => addTag(text)}"> Add </button>
	<div id="autocomplete">
		<AutoComplete input="{text}" callback="{addTag}" />
	</div>
</div>

<style>
	div#container {
		height: 1.5rem;
		display: flex;
		flex-direction: row;
	}

	input {
		border: 0rem solid var(--BORDER-1);
		border-radius: 0.1rem;
		width: calc(100% - 4.5rem);
		margin-right: 0.5rem;
	}

	button {
		width: 4rem;
		border-radius: 1rem;

		border: 0.1rem solid var(--BORDER-2);
		background: var(--BACKGROUND-4);
		transition: ease 0.2s;
	}

	button:hover {
		border-color: var(--BORDER-2-HOVER);
		background: var(--BACKGROUND-4-HOVER);
	}

	div#autocomplete {
		position: absolute;
		left: 14rem;
		top: 4rem;
		z-index: 1;
	}
</style>
