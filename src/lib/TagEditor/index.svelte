<script lang="ts">
    import TagInput from "./TagInput.svelte";
    import TagList from "./TagList.svelte";

    export const baseTags: string[] = [];
    export let tags: string[];

    $: originalTags = baseTags.concat(tags).filter(tag => tags.includes(tag));
    $: addedTags = tags.filter(tag => !baseTags.includes(tag));
    $: removedTags = baseTags.filter(tag => !tags.includes(tag));

    const addTag = (tag: string) => tags = tags.concat(tag)
</script>

<div>
    <TagInput callback={addTag} />
    <TagList {tags} {originalTags} {addedTags} {removedTags}/>
</div>

<style>
    div {
        width: fit-content;
        background: var(--BACKGROUND-3);
        
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
</style>