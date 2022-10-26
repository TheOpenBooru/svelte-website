<script lang="ts">
  import { profile, posts_search } from "js/booru"
  import PostsSection from "./PostsSection.svelte"

  async function getData(){
    let profileData = await profile();
    let creationDate = new Date(Number(profileData.created_at)  * 1000)

    return {
      data: profileData,
      creationDate
    }
  }
</script>

{#await getData() then { data, creationDate }}
  <h1>
    {data.username}
  </h1>
  <h2>
    {creationDate.toLocaleDateString()}
  </h2>
  <h2>
    Posts
  </h2>
  <div>
    <PostsSection ids={data.posts}/>
  </div>
{/await}

<style>
  h1 { 
    font-size: 4rem;
  }

  h2 { 
    font-size: 2rem;
  }

  div {
    position: fixed;
    width: 90%;
    left: min(5%, 2rem);
  }
</style>