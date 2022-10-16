<script lang="ts">
	import TagAutocomplete from "lib/AutoComplete.svelte"
	export let addTagCallback: Function;

	let search_text = '';

	function NormaliseText(text: string): string {
		return text
			.replace(' ', '_')
			.toLowerCase()
			.split('')
			.filter((char) => /[_()a-z0-9]/.test(char))
			.join('');
	}

	function keyPressHandler(e) {
		if (e.key !== 'Enter') return;
		confirmTag(search_text);
	}

	function onInput(e) {
		let text = e.target.value;
		search_text = NormaliseText(text);
	}

	function confirmTag(tag: string) {
		search_text = '';
		addTagCallback(tag);
	}
</script>

<input
	class=""
	type="search"
	bind:value={search_text}
	on:keypress={keyPressHandler}
	on:change={onInput}
/>

<div>
    <TagAutocomplete input={search_text} addTagCallback={confirmTag} />
</div>

<style>
	input {
		width: 100%;
		border-radius: 0.5rem;
		justify-self: flex-start;
	}

	/* div {
        z-index: 1;
        position: absolute;
        top: 2.5rem;
        left: 9rem;
    } */
</style>
