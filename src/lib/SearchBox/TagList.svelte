<script lang="ts">
	export let includeTags: string[];
	export let excludeTags: string[];

	import Tag from 'lib/Tag.svelte';

	const removeTagCallback = (tag: string)  => () => {
		if (includeTags.includes(tag)) {
			includeTags = includeTags.filter((t) => t !== tag);
		} else {
			excludeTags = excludeTags.filter((t) => t !== tag);
		}
	};

	const toggleTagCallback = (tag: string) => () => {
		if (!includeTags.includes(tag)) {
			includeTags = includeTags.concat(tag);
		} else {
			excludeTags = excludeTags.concat(tag);
		}
		removeTagCallback(tag);
	};
</script>

<div class="container">
	{#each includeTags as tag}
		<div>
			<Tag tagName={tag} callback={removeTagCallback(tag)}>
				<img src="/images/cross.svg" alt="Remove Tag" on:click={toggleTagCallback(tag)} />
			</Tag>
		</div>
		{/each}
		{#each excludeTags as tag}
			<div class="removed-tag">
				<Tag tagName={tag} callback={removeTagCallback(tag)}>
					<img src="/images/cross.svg" alt="Remove Tag" on:click={toggleTagCallback(tag)} />
				</Tag>
			</div>
	{/each}
</div>

<style>
	.container {
		height: 100%;
		gap: 0.5rem;
		padding: 0.3rem;
		display: flex;

		flex-direction: column;
		align-items: baseline;
	}

	.removed-tag {
		font-style: italic;
		color: #8b0000;
	}

	img {
		cursor: pointer;
		user-select: none;
		width: 1rem;
		height: 1rem;

		/* Change colour to red */
		filter: invert(13%) sepia(51%) saturate(6190%) hue-rotate(359deg) brightness(78%) contrast(118%);
	}
</style>
