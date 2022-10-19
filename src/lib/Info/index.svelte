<script lang="ts">
	import Sidebar from './Sidebar.svelte';
	import About from './About.svelte';
	import Contact from './Contact.svelte';
	import Api from './Api.svelte';
	import PatchNotes from './PatchNotes.svelte';
	
	export let page: "about" | "contact" | "patchnotes" | "api" = "about";
</script>

<main>
	<Sidebar current={page}/>
	<div>
		{#if page == "about"}
			<About />
		{:else if page == "contact"}
			<Contact />
		{:else if page == "patchnotes"}
			<PatchNotes />
		{:else if page == "api"}
			<Api />
		{/if}
	</div>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 10rem 1fr;
		height: 100%;
	}

	div {
		background: var(--BACKGROUND-1);
	}
</style>
