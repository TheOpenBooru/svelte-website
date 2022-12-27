<script lang="ts">
	import type { Types } from "openbooru";
	import { afterUpdate, onMount, onDestroy } from "svelte";
	import LoadingIcon from "lib/LoadingIcon.svelte";
	import Item from "./Item.svelte";
	import { SplitPosts } from "./utils";
	import About from "lib/Info/About.svelte";
	import type { LoadEvent } from "@sveltejs/kit";

	export let finished: boolean;
	export let loading: boolean;
	export let posts: Types.Post[];
	export let requestPosts: () => void;
	export let callback: Function;

	const Clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

	let container: Element;
	async function checkNewPosts() {
		if (!container || finished) return;
		const { scrollTop, offsetHeight, scrollHeight } = container;
		let distanceFromTop = scrollTop + offsetHeight;
		let distanceFromBottom = scrollHeight - distanceFromTop;
		if (distanceFromBottom < 2000) {
			await requestPosts();
		}
	}

	let column_count = 3;
	$: post_columns = SplitPosts(posts, Clamp(column_count, 1, 8));
	function updateColumnCount(element: Element) {
		if (!element) return;
		column_count = Math.floor((element.clientWidth - 200) / 300);
	}


	let interval: NodeJS.Timer;
	onMount(() => {
		interval = setInterval(checkNewPosts, 300)
	})
	onDestroy(() => clearInterval(interval))
	
	onMount(checkNewPosts);
	onMount(() => {
		let ro = new ResizeObserver(entries => {
			entries.forEach(entry => updateColumnCount(entry.target));
		});
		ro.observe(container);
	});
</script>

<main bind:this="{container}">
	<div id="columns">
		{#each post_columns as column}
			<div class="column">
				{#each column as post, index}
					<Item
						index="{index}"
						post="{post}"
						priority="{index < 5}"
						postCallback="{callback({ id: post.id, index })}"
					/>
				{/each}
			</div>
		{/each}
	</div>

	{#if loading}
		<div id="loading" class="{post_columns.length === 0 ? 'center' : 'bottom'}">
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

	@media screen and (max-width: 40rem), (orientation: portrait) {
		main {
			padding-left: 1rem;
			padding-right: 1rem;
		}
		div.column {
			--IMAGE-WIDTH: 40vw;
			margin: 8px;
		}
	}

	#loading {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#loading.center {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	#loading.bottom {
		position: absolute;
		width: 100%;
		height: 100%;
		bottom: 1rem;
		position: static;
	}
</style>
