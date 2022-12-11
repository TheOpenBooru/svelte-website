<script lang="ts">
  import type { PageData } from './$types';
	import { ID } from "js/booru"
	import * as Links from "js/links"
	import HeadInfo from "lib/HeadInfo.svelte"
	import PostPage from "lib/Post/Page.svelte"


  export let data: PageData;
	let post = data.post;
</script>

<HeadInfo
  title={`Post ${ID.encode(post.id)}`}
	path={Links.post(post.id)}
  media={post.full}
/>
<PostPage {post}/>
