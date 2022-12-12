<script lang="ts">
	import type { PageData } from "./$types";
	import { browser } from "$app/environment";
	import PostsPage from "lib/Posts/Page.svelte";
	import HeadInfo from "lib/HeadInfo.svelte";

	export let data: PageData;
	let posts = data.posts;

	let layout: "grid" | "column" = "grid";
	if (browser) {
		let last_layout = localStorage.getItem("last-posts");
		if (last_layout === "grid" || last_layout === "column") {
			layout = last_layout;
		}
	}
</script>

<HeadInfo path="/posts" />
<PostsPage layout="{layout}" initialPosts="{posts}" />
