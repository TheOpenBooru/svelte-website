<script lang="ts">
	import { posts_search } from "js/booru";
	import type { Types } from "openbooru";

  export let ids: number[]|bigint[] = [];

  async function getPosts(): Promise<Types.Post[]>{
    ids.reverse()
    let posts = await posts_search({
      ids:ids.map(v => Number(v))
    })
    return posts;
  }
</script>

{#await getPosts() then posts}
  <div>
    {#each posts as post}
      <a href="/post/{post.id}">
        <img
          src={post.thumbnail.url}
          alt=""
          height={post.thumbnail.height}
          width={post.thumbnail.width}
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

    border: solid .3rem var(--COLOR-4);
    padding-top: .15rem;
    border-radius: 1rem;
    
    overflow: hidden;
    
    display: flex;
    flex-wrap: nowrap;
    gap: .5rem;
  }
  
  img {
    box-sizing: border-box;
    height: 10rem;
    width: auto;
    border-radius: .5rem;
    border: solid .3rem var(--COLOR-3);
  }
</style>