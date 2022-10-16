<script lang="ts">
    import type { Types } from "openbooru";
    export let source: string = "";
    
    let url;
    try {
        url = new URL(source);
    } catch {
        url = null
    }
</script>

{#if url === null}
    <div title={source}>
        <span>{source}</span>
    </div>
{:else}
    <div title={url.hostname}>
        <span>{source}</span>
        <a href={source}>
            <img src="/images/link.svg" height={10} width={10} />
        </a>
    </div>
{/if}


<style>
    div {
        min-height: 1.2rem;
        display: flex;
        max-width:90vw;
    }

    span {
        max-width: 80vw;
        color: #0c181d;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    img {
        margin-top: 0.2rem;
        margin-left: 0.2rem;
        width: 0.8rem;
        height: 0.8rem;
    }

    a{
        user-select: none;
        cursor: pointer;
    }
</style>
