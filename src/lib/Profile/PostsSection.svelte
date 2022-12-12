<script lang="ts">
	import { posts_search } from "js/booru";
	import { generateUrl } from "js/proxy";
	import Links from "js/links";
	import type { Types } from "openbooru";

	export let ids: number[] | bigint[] = [];

	async function getPosts(): Promise<Types.Post[]> {
		ids.reverse();
		let posts = await posts_search({
			ids: ids.map(v => Number(v)),
		});
		return posts;
	}
</script>

{#await getPosts() then posts}
	<div>
		{#each posts as post}
			<a href="{Links.post(post.id)}">
				<img
					src="{generateUrl(post.thumbnail.url)}"
					alt=""
					height="{post.thumbnail.height}"
					width="{post.thumbnail.width}"
				/>
			</a>
		{/each}
	</div>
{/await}

<style>
	div {
		box-sizing: border-box;
		height: fit-content;
		width: 100%;

		border: solid 0.3rem var(--COLOR-4);
		padding-top: 0.15rem;
		border-radius: 1rem;

		overflow: hidden;

		display: flex;
		flex-wrap: nowrap;
		gap: 0.5rem;
	}

	img {
		box-sizing: border-box;
		height: 10rem;
		width: auto;
		border-radius: 0.5rem;
		border: solid 0.3rem var(--COLOR-3);
	}
</style>
