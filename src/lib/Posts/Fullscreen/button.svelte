<script lang="ts">
    import type { Types } from "openbooru";
    import LoadingIcon from "lib/LoadingIcon.svelte"
    export let callback: () => void;
    export let post: Types.Post|null;
    export let loading: boolean = false;
</script>

<div on:click={callback}>
    {#if post}
        <img src={post.thumbnail.url} alt="" />
    {:else if loading}
        <LoadingIcon/>
    {/if}
</div>

<style>
    div {
        height: 100%;
        width: var(--BUTTON-WIDTH);
        
        outline: solid 1px #000;
        background-color: var(--BACKGROUND-2);
    
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    
    img {
        max-height: 50%;
        width: 90%;
        padding: .5rem;
        object-fit: cover;
    }
    
    div:active>img{
        width: 80%;
        transition: 0.05s;
        filter: drop-shadow(2px 2px 2px #000);
    }
    
</style>