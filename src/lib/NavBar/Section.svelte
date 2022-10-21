<script lang="ts">
	export let image: string;
	export let name: string;
	export let path: string;
</script>

<a href={path} title={name}>
	<div class="icon">
		<img src={image} alt={name} height="32" width="32"/>
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
		height: calc(100% - 0.6rem);
		border-radius: 1rem;
		margin: .3rem;
		padding: 0 .5rem;

		/* Center containinng items */
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	a {
		/* Look */
		font-size: 1.3rem;
		color: black;
		justify-content: center;
		text-decoration: none;

		cursor: pointer;
		border: 3px solid var(--BORDER-1);
		background-color: var(--BACKGROUND-3);
	}

	@media screen and (max-width: 40rem), (orientation: portrait){
		a {
			width: 100% !important;
			padding: 0 !important;
			margin: .1rem !important;
		}
	}

	a:hover {
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
	
	@keyframes fadeIn{
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
