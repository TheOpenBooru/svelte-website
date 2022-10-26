<script lang="ts">
	export let originalTags: string[];
	export let addedTags: string[];
	export let removedTags: string[];
	export let tags: string[];


	const addTag = (tag: string) => () => {
		tags = tags.concat(tag)
	};
	const removeTag = (tag: string) => () => {
		tags = tags.filter(v => v !== tag);
	};
</script>

<main>
	{#each originalTags as tag}
		{#if removedTags.includes(tag)}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="removed" on:click={addTag(tag)}>
				{tag}
			</div>
		{:else}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={removeTag(tag)}>
				{tag}
			</div>
		{/if}
	{/each}

	{#each addedTags as tag}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="added" on:click={removeTag(tag)}>
			{tag}
		</div>
	{/each}
</main>

<style>
	main {
		height: fit-content;
		padding: .5rem 0 .5rem 0;
		overflow-y: auto;

		border: 0.2rem var(--BORDER-1) solid;
		border-radius: 0.2rem;
		background: var(--BACKGROUND-2);

		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-content: baseline;
	}

	div {
		width: fit-content;
		padding: 0.1rem;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		margin: 0.1rem;

		cursor: pointer;
		user-select: none;
		border-radius: 1rem;
		border-width: 0.1rem;
		border-style: solid;

		display: flex;
		flex-flow: nowrap row;
		align-items: center;
		justify-content: center;

		background: var(--BACKGROUND-3);
		border-color: var(--BORDER-1);
	}

	div.removed {
		opacity: 0.5;
	}

	div.added {
		background: var(--BACKGROUND-4);
		border-color: var(--BORDER-2);
	}
</style>