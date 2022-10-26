<script lang="ts">
  import { profile, posts_search } from "js/booru"
  import GridPosts from "lib/Posts/Grid/index.svelte"

  const postsSearch = new Search()
  async function getPosts(ids: number[]){
    postsSearch.updateQuery({ids})
  }

  async function getData(){
    let profileData = await profile();
    let creationDate = new Date(Number(profileData.created_at)  * 1000)
    return {
      data: profileData,
      name: profileData.username,
      postsPromise: getPosts(profileData.posts),
      creationDate
    }
  }
</script>

{#await getData() then { data, name, creationDate, postsPromise }}
  <h1>
    {name}
  </h1>
  <h2>
    {creationDate.toLocaleDateString()}
  </h2>
  {#await postsPromise then posts}
    <h2>
      Posts
    </h2>
    <div>
      <GridPosts
        useScroll={false}
        finished={postsSearch.finished}
        requestPosts={postsSearch.requestPosts}
        posts={postsSearch.posts}
      />
    </div>
  {/await}
{/await}

<style>
  h1 { 
    font-size: 4rem;
  }

  h2 { 
    font-size: 2rem;
  }
  
  div {
    height: 50rem;
  }
</style>