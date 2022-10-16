<script lang="ts">
  import type { PageData } from './$types';
	import HeadInfo from "lib/HeadInfo.svelte"
	import PostPage from "lib/Post/Page.svelte"


  export let data: PageData;
	let post = data.post;
</script>

<HeadInfo
  title={`Post ${post.id}`}
  description={`${post.tags.join(", ")}`}
  keywords={["post", "media", "openbooru"].concat(post.tags)}
  path={`/post/${post.id}`}
/>
<PostPage {post}/>
