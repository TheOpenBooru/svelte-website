<script lang="ts">
	import Button from 'lib/Button.svelte';
	import { READ_ONLY } from 'js/config';
	import { hasPermission } from 'js/booru';

	export let editCallback: () => void = () => {};
	export let deleteCallback: () => void = () => {};
</script>

<main>
	{#if !READ_ONLY}
		{#await hasPermission("canDeletePosts") then canDelete}
			{#if canDelete}
				<Button src="/images/trash.svg" callback={deleteCallback}/>
			{/if}
		{/await}
		{#await hasPermission("canEditPosts") then canEdit}
			{#if canEdit}
				<Button src="/images/edit.svg" callback={editCallback}/>
			{/if}
		{/await}
	{/if}
</main>

<style>
    main {
        margin: 0.5rem;

        display: flex;
        flex-flow: column nowrap;
        gap: 0.5rem;
    }

    @media screen and (max-width: 40rem), (orientation: portrait){
        main {
            flex-direction: row;
        }
    }
</style>
