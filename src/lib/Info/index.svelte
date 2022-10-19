<script lang="ts">
	import Sidebar from './Sidebar.svelte';
	import About from './About.svelte';
	import Contact from './Contact.svelte';
	import Api from './Api.svelte';
	export let page = 'about';
</script>

<main>
	<Sidebar current={page}/>
	<div>
		{#if page == 'about'}
			<About />
		{:else if page == 'contact'}
			<Contact />
		{:else if page == 'api'}
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
