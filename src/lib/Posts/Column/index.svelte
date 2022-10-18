<script lang="ts">
	import type { Types } from 'openbooru';
	import { onMount, afterUpdate } from 'svelte';
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
		if (!container || finished) return;
		const { scrollTop, offsetHeight, scrollHeight } = container;
		let distanceFromTop = scrollTop + offsetHeight;
		let distanceFromBottom = scrollHeight - distanceFromTop;
		if (distanceFromBottom < 2000) {
			await requestPosts();
		}
	}
	
	let column_count = 0;
	column_count = Clamp(column_count, 2 , 8)
	$: columns = SplitPosts(posts, column_count);;
	
	onMount(CheckNewPosts);
	onMount(() => {
		column_count = Math.floor(window.document.body.clientWidth / 400)
	});
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
	</div>

	{#if loading && columns.length === 0}
		<div id="loading" class="center">
			<LoadingIcon />
		</div>
	{:else if loading}
		<div id="loading" class="bottom">
			<LoadingIcon fadeIn />
		</div>
	{/if}
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
	
	@media screen and (min-width: 30rem){
		main {
			padding-left: 5vw;
			padding-right: 5vw;
		}
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
	}

	#loading.center{
		position: absolute;
		top:0;
		left:0;
		width: 100%;
		height: 100%;
	}

	#loading.bottom{
		bottom: 0rem;
		position: static;
	}
</style>
