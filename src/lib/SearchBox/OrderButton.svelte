<script lang="ts">
	export let descending: boolean;
</script>

<div on:click="{() => (descending = !descending)}">
	<img
		src="{descending ? '/images/arrow-down.svg' : '/images/arrow-up.svg'}"
		alt="Sort {descending ? 'Descending' : 'Ascending'}"
	/>
</div>

<style>
	div {
		background-color: var(--BACKGROUND-4);
		border: 3px solid var(--BORDER-1);
		min-height: 1.2rem;
		min-width: 1.2rem;
		height: 1.2rem;
		width: 1.2rem;

		transition: 0.15s ease-out;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	div:hover {
		transition: 0.3s ease-out;
		background-color: var(--BACKGROUND-3);
		border-radius: 0.4rem;
	}

	img {
		width: 95%;
		height: 95%;
	}
</style>
