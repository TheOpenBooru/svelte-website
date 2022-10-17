<script>
	import Item from './Section.svelte';
</script>

<nav>
	<Item path="/" name="Home" image="/images/home.svg" />
	<Item path="/info" name="Info" image="/images/info.svg" />
	<Item path="/account" name="Login" image="/images/profile.svg" />
</nav>

<style>
	nav {
		position: sticky;
		top: 0;
		left: 0;
		height: var(--NAVBAR-HEIGHT);
		width: 100vw;
		z-index: 1;

		/* Look */
		background-color: var(--BACKGROUND-2);
		border-bottom: black 1px solid;

		/* Grid */
		display: flex;
		object-fit: fill;
		align-items: center;
	}
</style>
