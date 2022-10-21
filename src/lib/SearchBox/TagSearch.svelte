<script lang="ts">
	export let includeTags: string[];

	let text = "";

	function normaliseText(): string {
		text = text
			.replace(' ', '_')
			.toLowerCase()
			.split('')
			.filter((char) => /[_()a-z0-9]/.test(char))
			.join('');
	}

	function keyPressHandler(e: KeyboardEvent) {
		if (e.key === 'Enter') {
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
	bind:value={text}
	on:input={normaliseText}
	on:keypress={keyPressHandler}
/>

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
