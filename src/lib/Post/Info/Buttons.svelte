<script lang="ts">
    export let canEdit: boolean = true;
    export let canDelete: boolean = true;
    export let editCallback: () => void;
    export let deleteCallback: () => void;
</script>

<main>
    {#if canEdit}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="button" on:click={() => editCallback()}>
            <div class="image-container">
                <img src="/images/edit.svg" alt="" width="64" height="64"/>
            </div>
        </div>
    {/if}
    {#if canDelete}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="button" on:click={() => deleteCallback()}>
            <div class="image-container">
                <img src="/images/trash.svg" alt="" width="64" height="64"/>
            </div>
        </div>
    {/if}
</main>

<style>
    main {
        margin: 0.5rem;
        height: 100%;

        display: flex;
        flex-flow: column nowrap;
        gap: 0.5rem;
    }

    .image-container {
        width: 100%;
        height: 100%;
        filter: invert(0);
    }

    .button {
        width: 2rem;
        height: 2rem;

        display: flex;
        justify-content: center;
        align-items: center;
        
        cursor: pointer;
        background-color: var(--BACKGROUND-4);
        border-radius: 0.5rem;
        border: 0.2rem var(--BORDER-2) solid;
        padding: 0.2rem;
    }

    img {
        width: 100%;
        height: 100%;

    }
</style>
