<script lang="ts">
	import PostsPage from "lib/Posts/Page.svelte";
	import Grid from "lib/Posts/Grid/index.svelte"
	import HeadInfo from "lib/HeadInfo.svelte";
</script>

<HeadInfo path="/posts/grid"/>
<PostsPage layout={Grid}/>
