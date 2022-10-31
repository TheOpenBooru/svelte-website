<script lang="ts">
	import type { Types } from "openbooru";
	import * as Booru from "js/booru";
    
    export let post: Types.Post;
    
    let downvoted = false;
    let upvoted = false;
    const loggedIn = false;

    const upvoteUrl = upvoted ? "thumbs-up-solid.svg" : "thumbs-up-regular.svg";
    const downvoteUrl = downvoted ? "thumbs-down-solid.svg" : "thumbs-down-regular.svg";
    
    function upvoteCallback() {
        if (!loggedIn) return;

        upvoted = !upvoted
        if (upvoted) {
            post.upvotes += 1
            Booru.add_upvote(post.id);
            if (downvoted){
                post.downvotes -= 1
                downvoted = false;
            }
        } else {
            post.upvotes -= 1
            Booru.remove_upvote(post.id);
        }
    };

    function downvoteCallback() {
        if (!loggedIn) return;

        downvoted = !downvoted;
        if (downvoted) {
            post.downvotes += 1
            Booru.add_downvote(post.id)
            if (upvoted){
                post.upvotes -= 1
                upvoted = false;
            }
        } else {
            post.downvotes -= 1
            Booru.remove_downvote(post.id)
        }
    };

    const NumberFormatter = Intl.NumberFormat("en", { notation: "compact"})
</script>

<div>
    <button type="button" on:click={upvoteCallback}>
        <img
            src="/images/{upvoteUrl}"
            alt="Upvote"
            title="Upvote"
            width={20}
            height={20}
        />
        <span>{NumberFormatter.format(post.upvotes)}</span>
    </button>
    <button type="button" on:click={downvoteCallback}>
        <img
            src="/images/{downvoteUrl}"
            alt="Downvote"
            title="Downvote"
            width={20}
            height={20}
        />
        <span>{NumberFormatter.format(post.downvotes)}</span>
    </button>
</div>

<style>
    div {
        width: fit-content;
        margin: 1rem;
        
        display: flex;
        flex-flow: nowrap row;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }
    
    button {
        background: 0;
        padding: 0;
        border: 0;
        cursor: pointer;
        display: flex;
        flex-flow: nowrap column;
        align-items: center;
    }

    span {
        font-size: 1.2rem;
        color: black;
    }

    img {
        height: 4rem;
        width: 4rem;
    }

</style>