<script lang="ts">
	import Login from "./Login.svelte";
	import Register from "./Register.svelte";
	import Buttons from "./Buttons.svelte";

	export let mode: "login" | "register" = "login";
	let error = "";
</script>

<main>
	<div id="container">
		<Buttons mode="{mode}" />
		{#if error}
			<span>
				{error}
			</span>
		{/if}
		<div id="inputs">
			{#if mode === "login"}
				<Login bind:error="{error}" />
			{:else}
				<Register bind:error="{error}" />
			{/if}
		</div>
	</div>
</main>

<style>
	main {
		height: 100%;
		width: 100%;
		margin-top: 5%;

		display: flex;
		align-items: baseline;
		justify-content: center;
	}

	div#container {
		height: fit-content;
		min-height: fit-content;
		width: 24rem;

		border: 3px solid var(--BORDER-1);
		background-color: var(--BACKGROUND-3);
		border-radius: 1rem;

		display: flex;
		flex-flow: nowrap column;
		justify-content: center;
	}

	div#inputs {
		padding: 1rem;
	}

	span {
		width: 100%;
		color: darkred;

		text-align: center;
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
		font-weight: bolder;
	}
</style>
