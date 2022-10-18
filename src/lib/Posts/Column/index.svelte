<script lang="ts">
	import type { Types } from 'openbooru';
	import { onMount } from 'svelte';
	import LoadingIcon from 'lib/LoadingIcon.svelte';
	import Item from './Item.svelte';
	import { SplitPosts } from './utils';

	export let index: number;
	export let finished: boolean;
	export let loading: boolean;
	export let posts: Types.Post[];
	export let requestPosts: Function;
	export let callback: Function;

	const Clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

	let container: Element;
	async function CheckNewPosts() {
		if (!container) return;
		const { scrollTop, offsetHeight, scrollHeight } = container;
		let distanceFromTop = scrollTop + offsetHeight;
		let distanceFromBottom = scrollHeight - distanceFromTop;
		console.log(distanceFromBottom);
		if (distanceFromBottom < 2000) {
			await requestPosts();
		}
	}
	
	onMount(CheckNewPosts);

	let columns = SplitPosts(posts, 4);
</script>

<main bind:this={container} on:scroll={() => CheckNewPosts()}>
	<div id="columns">
		{#each columns as posts}
			<div class="column">
				{#each posts as post, index}
					<Item
						{index}
						{post}
						priority={index < 5}
						postCallback={callback({ id: post.id, index })}
					/>
				{/each}
			</div>
		{/each}

		{#if finished}
			<hr />
		{:else if loading}
      <div id="loading">
        <LoadingIcon fadeIn />
      </div>
		{:else}
			<hr />
		{/if}
	</div>
</main>

<style>
	main {
		height: 100%;
		padding-top: 3rem;
		padding-left: 20vw;
		padding-right: 20vw;
		overflow-y: auto;

		display: grid;
		align-items: center;
		justify-items: center;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, 200px, 1fr);
	}

	#columns {
    width: 100%;
    /* Flex */
    display: flex;
    flex-direction: row;
    justify-content: center;
	}

	.column {
    --IMAGE-WIDTH: 300px;
    --IMAGE-MARGIN: 8px;

    width: var(--IMAGE-WIDTH);
    margin: var(--IMAGE-MARGIN);

    display: flex;
    flex-direction: column;
    align-items: center;
	}

	#loading {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 2rem;
	}
</style>
