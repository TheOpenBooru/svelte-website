<script lang="ts">
	export let descending: boolean;
</script>

<button on:click={() => (descending = !descending)}>
	<img
		src="{descending ? '/images/arrow-down.svg' : '/images/arrow-up.svg'}"
		alt="Sort {descending ? 'Descending' : 'Ascending'}"
	/>
</button>

<style>
	button {
		background-color: var(--BACKGROUND-4);
		border: .2rem solid var(--BORDER-1);
		height: 1.575rem;
		width: 1.575rem;
		aspect-ratio: 1;
		padding: 0;

		transition: 150ms ease-out;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	button:hover {
		transition: 0.3s ease-out;
		background-color: var(--BACKGROUND-3);
		border-radius: 0.4rem;
	}

	img {
		width: 95%;
		height: 95%;
	}
</style>
