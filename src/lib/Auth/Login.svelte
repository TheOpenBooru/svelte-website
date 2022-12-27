<script lang="ts">
	import { Account } from "js/booru";

	export let error: string;

	async function submit(event: Event){
		event.preventDefault();

		try {
			await Account.login(username, password);
			location.href = "/profile";
		} catch (e) {
			if (e instanceof Error) error = e.message;
			if (e instanceof String) error = e.toString();
			return;
		}
	}

	let username: string;
	let password: string;
</script>

<form on:submit={submit}>
	<input bind:value={username} class="input" type="username" placeholder="Username" required/>
	<input bind:value={password} class="input" type="password" placeholder="Password" required/>
	<input id="submit" type="submit" value="Login" />
</form>

<style>
	form {
		width: 100%;
		display: flex;
		flex-flow: nowrap column;
		justify-content: center;
		align-items: center;
		gap: 0.2rem;
	}

	input.input {
		font-size: larger;
		border-radius: 0.5rem;

		background-color: var(--BACKGROUND-2);
		border-color: var(--BACKGROUND-4);
		color: black;

		width: calc(100% - 1.5rem);
		max-width: 40rem;
	}

	input.input::placeholder {
		opacity: 0.8;
		color: black;
	}

	input[type="submit"] {
		height: 2rem;
		width: 100%;
		max-width: 30rem;
		margin-top: 1rem;

		border-radius: 1rem;
		font-size: large;
		font-weight: bold;

		background-color: var(--BACKGROUND-4);
		border-color: var(--BORDER-1);
	}
</style>
