<script lang="ts" context="module">
  import type { Types } from "openbooru";
  import { Posts } from "openbooru";
  import { API_URL } from "js/config"
  
  export let finished = false;
  export let loading = false;
  export let index = 0;
  export let query: Types.PostQuery = {};
  export let posts: Types.Post[] = [];
  
  
  export async function requestPosts() {
    if (finished || loading) return;
    loading = true;
    
    const limit = 100;
    let new_posts;
    try {
      new_posts = await Posts.search(
        query,
        index,
        limit,{
          apiUrl: API_URL
        }
      );
    } catch (e){
        return;
    }

    index += new_posts.length;
    posts = posts.concat(new_posts);

    loading = false;
  }
  
  export async function updateQuery(query: Types.PostQuery) {
    index = 0;
    finished = false;
    loading = false;
    query = query;
    posts = [];
  }
</script>
