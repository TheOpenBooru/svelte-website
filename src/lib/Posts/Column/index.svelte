<script lang="ts">
	import type { Types } from 'openbooru';
	import { afterUpdate, onMount } from 'svelte';
	import LoadingIcon from 'lib/LoadingIcon.svelte';
  import Item from "./Item.svelte"
	import { SplitPosts } from './utils.svelte';

	export let index: number;
	export let finished: boolean;
	export let loading: boolean;
	export let posts: Types.Post[];
	export let requestPosts: () => void;
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
	
	let column_count = 3;
	$: columns = SplitPosts(posts, Clamp(column_count, 2 , 8));
	function updateColumnCount(element: Element){
		column_count = Math.floor((element.clientWidth - 200) / 300)
	}
	onMount(CheckNewPosts);
	onMount(() => {
		let ro = new ResizeObserver(entries => {
			entries.forEach(
				entry => updateColumnCount(entry.target))
		})
		ro.observe(container);
	});
</script>

<main
	bind:this={container}
	on:scroll={CheckNewPosts}
	on:load={(e) => updateColumnCount(e.target)}
>
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
		padding: 3rem 10vw;
		overflow-y: auto;

		display: flex;
		justify-items: center;
		gap: 1rem;
	}
	
	div.column {
		--IMAGE-WIDTH: 300px;
    --IMAGE-MARGIN: 8px;
		
    width: 100%;
    margin: var(--IMAGE-MARGIN);
		
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
	}
	
	@media screen and (max-width: 40rem), (orientation: portrait){
		main {
			padding-left: 5vw;
			padding-right: 5vw;
		}
		div.column{
			--MARGIN: 2vw;
			--IMAGE-WIDTH: 40vw;
			margin: var(--MARGIN);

		}
	}

	#columns {
    width: 100%;
    /* Flex */
    display: flex;
    flex-direction: row;
    justify-content: center;
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
