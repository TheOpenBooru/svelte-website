<script lang="ts">
	import PostsPage from "lib/Posts/Page.svelte";
	import Column from "lib/Posts/Column/index.svelte"
	import HeadInfo from "lib/HeadInfo.svelte";
</script>

<HeadInfo path="/posts/column"/>
<PostsPage layout={Column}/>
