<script lang="ts">
	import type { Types } from 'openbooru';
	import { onMount } from 'svelte';
	import LoadingIcon from 'lib/LoadingIcon.svelte';
	import GridItem from './Item.svelte';
	
	export let index: number;
	export let finished: boolean;
	export let loading: boolean;
	export let posts: Types.Post[];
	export let requestPosts: Function;
	export let callback: Function;
	
	let container: Element;
	async function CheckNewPosts() {
		console.log(container);
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
</script>

<main bind:this={container} on:scroll={() => CheckNewPosts()}>
	<div class="grid">
		{#if posts.length > 0}
			{#each posts as post, index}
				<GridItem {post} callback={callback({ id: post.id, index })} />
			{/each}
			{#if finished}
				<hr />
			{/if}
		{:else}
			<LoadingIcon fadeIn />
		{/if}
	</div>
</main>

<style>
	main {
		--IMAGE-SIZE: 192px;

		/* Position */
		max-width: 100vw;
		max-height: var(--PAGE-HEIGHT);
		overflow-y: auto;
		overflow-x: hidden;
	}

	.grid {
		overflow-x: hidden;
		padding: 2rem 10vw 2rem 10vw;

		/* Grid */
		display: grid;
		align-items: center;
		justify-items: center;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(min(calc(40vw - 2rem), var(--IMAGE-SIZE)), 1fr));
	}
</style>
