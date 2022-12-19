<script lang="ts">
	import PostsPage from "lib/Posts/Page.svelte";
	import HeadInfo from "lib/HeadInfo.svelte";
	import { browser } from "$app/environment";

	if (browser) {
		localStorage.setItem("last-posts", "column");
	}
</script>

<HeadInfo path="/posts/column" />
<PostsPage layout="column" />
