<script lang="ts">
	export let rating: string;
</script>

<div>
	<label for="rating">Rating: </label>
	<select name="rating" bind:value="{rating}">
		<option value="unrated">Unrated</option>
		<option value="sensitive">Sensitive</option>
		<option value="safe">Safe</option>
		<option value="mature">Mature</option>
		<option value="explicit">Explicit</option>
	</select>
</div>
