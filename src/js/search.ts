import type { Types } from "openbooru";
import { Posts } from "openbooru";

export default class Search{
    finished = false;
    loading = false;
    index = 0;
    query: Types.PostQuery = {};
    posts: Types.Post[] = [];
    
    
    async requestPosts() {
        if (this.finished || this.loading) return;
        this.loading = true;
    
        const limit = 100;
        let new_posts;
        try {
            new_posts = await Posts.search(
                this.query,
                this.index,
                limit
            );
        } catch (e){
            return;
        }
    
        this.index += new_posts.length;
        this.posts = this.posts.concat(new_posts);
    
        this.loading = false;
    }
    
    async updateQuery(query: Types.PostQuery) {
        this.index = 0;
        this.finished = false;
        this.loading = false;
        this.query = query;
        this.posts = [];
    }
}
