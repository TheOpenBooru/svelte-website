<script lang="ts">
	import type { Types } from "openbooru";
	import { Post } from "openbooru";
    
    export let post: Types.Post;
    
    let downvoted = false;
    let upvoted = false;
    const loggedIn = false;

    const upvoteUrl = upvoted ? "/images/thumbs-up-solid.svg" : "/images/thumbs-up-regular.svg";
    const downvoteUrl = downvoted
        ? "/images/thumbs-down-solid.svg"
        : "/images/thumbs-down-regular.svg";
    
    function upvoteCallback() {
        if (!loggedIn) return;

        upvoted = !upvoted
        if (upvoted) {
            Post.add_upvote(post.id);
            if (downvoted) downvoted = false;
        } else {
            Post.remove_upvote(post.id);
        }
    };

    function downvoteCallback() {
        if (!loggedIn) return;

        downvoted = !downvoted;
        if (downvoted) {
            Post.add_downvote(post.id)
            if (upvoted) upvoted = false;
        } else {
            Post.remove_downvote(post.id)
        }
    };

    const NumberFormatter = Intl.NumberFormat("en", { notation: "compact"})
</script>

<main>
    <div>
        <img
            src={upvoteUrl}
            alt="Upvote"
            title="Upvote"
            loading=""
            on:click={upvoteCallback}
            style={{ cursor: loggedIn ? "pointer" : null }}
        />
        <span>{NumberFormatter.format(post.upvotes + Number(upvoted))}</span>
    </div>
    <div>
        <img
            src={downvoteUrl}
            alt="Upvote"
            title="Upvote"
            width={20}
            height={20}
            priority={true}
            on:click={downvoteCallback}
            style={{ cursor: loggedIn ? "pointer" : null }}
        />
        <span>{NumberFormatter.format(post.downvotes + Number(downvoted))}</span>
    </div>
</main>
<style>
    main {
        width: fit-content;
        margin: 1rem;
        
        display: flex;
        flex-flow: nowrap row;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }
    
    div {
        display: flex;
        flex-flow: nowrap column;
        align-items: center;
    }

    img {
        height: 4rem;
        width: 4rem;
    }

</style>