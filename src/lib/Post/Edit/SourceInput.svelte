<script lang="ts">
	export let originalSources: string[];
	export let sources: string[];
	let inputSource = source;
	const URL_REGEX = new RegExp(
		"http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*(),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+",
	);

	$: valid = URL_REGEX.test(inputSource);

	// function onChangeHandler() {
	//     if (URL_REGEX.test(inputSource)){
	//         source = inputSource;
	//     } else {
	//         source = originalSource;
	//     }
	// }
</script>

<!-- <div>
    <label for="source">Source:</label>
    <input
        type="text"
        name="source"
        class={valid ? "" : "invalid"}
        bind:value={inputSource}
    />
</div> -->
<style>
	input {
		width: 20rem;
	}
	input.invalid {
		border-color: red;
		filter: opacity(0.7);
	}
</style>
