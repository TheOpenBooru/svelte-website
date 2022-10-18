<script lang="ts">
	import { onMount } from 'svelte';
  import { Post } from 'openbooru';
  import type { Types } from 'openbooru';
	import HeadInfo from "lib/HeadInfo.svelte"
	import PostPage from "lib/Post/Page.svelte"

  let post: Types.Post
  onMount(async () => {
    let post_id = window.location.href.split("/").at(-1)
    post = await Post.get(Number(post_id))
  })
</script>

{#if post}
  <HeadInfo
    title={`Post ${post.id}`}
    description={`${post.tags.join(", ")}`}
    keywords={["post", "media", "openbooru"].concat(post.tags)}
    path={`/post/${post.id}`}
    media={post.full}
  />
  <PostPage {post}/>
{/if}