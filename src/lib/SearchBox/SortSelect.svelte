<script lang="ts">
    import type { Types } from "openbooru";
    export let sort: Types.Sort;
</script>


<select bind:value={sort}>
    <option value="created_at">Creation Date</option>
    <option value="id">ID</option>
    <option value="upvotes">Upvotes</option>
    <option value="downvotes">Downvotes</option>
</select>


<style>
    select {
        border-radius: .2rem;
        color: black;
        border: 0;
    }
</style>