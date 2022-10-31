<script lang="ts">
	import type { Types } from 'openbooru';
	import { afterUpdate, onMount } from 'svelte';
	import LoadingIcon from 'lib/LoadingIcon.svelte';
  import Item from "./Item.svelte"
	import { SplitPosts } from './utils';

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

	{#if loading}
		<div id="loading" class={columns.length === 0 ? "center" : "bottom"}>
			<LoadingIcon />
		</div>
	{/if}
</main>

<style>
	main {
		box-sizing: border-box;
		height: 100%;
		padding: 3rem 10vw;
		overflow-y: auto;

		display: flex;
		justify-items: center;
		flex-flow: column;
		gap: 1rem;
	}

	div#columns {
		width: 100%;
		/* Flex */
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	div.column {
		width: 100%;
		margin: 1rem;
		
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15px;
	}

	@media screen and (max-width: 40rem), (orientation: portrait){
		main {
			padding-left: 0;
			padding-right: 0;
		}
		div.column{
			--IMAGE-WIDTH: 40vw;
			margin: 8px;
		}
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
		position: absolute;
		width: 100%;
		height: 100%;
		bottom: 1rem;
		position: static;
	}
</style>
