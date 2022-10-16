<script lang="ts">
	export let image: string;
	export let name: string;
	export let path: string;
let icon_loading = true;

</script>

<a href={path} title={name}>
	<div class={"icon " + (icon_loading ? "loading" : "loaded")}>
		<img src={image} alt={name} height="32" width="32" on:load={() => (icon_loading = false)} />
	</div>

	<span class="text">
		{name}
	</span>
</a>

<style>
	a {
		/* Shape */
		min-width: fit-content;
		width: 5rem;
		height: calc(var(--NAVBAR-HEIGHT) - 0.6rem);
		border-radius: 1rem;
		margin: .3rem;
		padding-left: .5rem;
		padding-right: .5rem;

		/* Center containinng items */
		display: flex;
		gap: 1rem;
		flex-flow: row nowrap;
		justify-content: left;
		align-items: center;
	}

	a {
		/* Look */
		font-size: 1.2rem;
		color: black;
		justify-content: center;
		text-decoration: none;

		cursor: pointer;
		border: 3px solid var(--BORDER-1);
		background-color: var(--BACKGROUND-3);
	}

	.section:hover {
		border-color: var(--BORDER-1-HOVER);
	}

	div {
		height: 1.5rem;
		width: 1.5rem;
	}

	img {
		height: 100%;
		width: 100%;
	}

	.loaded {
		animation: forwards fadeIn ease-in .4s;
	}

	.text {
	}
	
	@keyframes fadeIn{
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

</style>
