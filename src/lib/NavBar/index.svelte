<script>
	import Item from './Section.svelte';
	import { profile, Account } from 'js/booru';
	import { browser } from '$app/environment';
</script>

<nav>
	<Item path="/" name="Home" image="/images/home.svg" />
	<Item path="/tags" name="Tags" image="/images/tags.svg" />
	<Item path="/info" name="Info" image="/images/info.svg" />

	{#if Account.loggedIn()}
		{#await profile()}
			<Item path="/account" name="" image="/images/profile.svg" />
		{:then data}
			<Item path="/account" name={data.username} image="/images/profile.svg" />
		{:catch}
			<Item path="/account" name="" image="/images/profile.svg" />
		{/await}
	{:else}
		<Item path="/account" name="Login" image="/images/profile.svg" />
	{/if}
</nav>

<style>
	nav {
		position: sticky;
		top: 0;
		left: 0;
		height: var(--NAVBAR-HEIGHT);
		max-height: var(--NAVBAR-HEIGHT);
		width: 100vw;
		z-index: 1;

		/* Grid */
		display: flex;
		object-fit: fill;
		align-items: center;
	}

	nav {
		background-color: var(--BACKGROUND-2);
		outline:  black 0 solid;
		outline-width: 1px;
	}

	@media screen and (max-width: 40rem), (orientation: portrait){
		nav {
				justify-content: space-around;
		}
	}
</style>
