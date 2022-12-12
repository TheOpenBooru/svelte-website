<script lang="ts">
	import { Account, getPermission } from "js/booru";
	import HCaptcha from "lib/Captcha.svelte";
	export let error: string;

	let permission_promise = getPermission("canRegister");

	function handleError(e: Error | string | any) {
		if (e instanceof Error) {
			error = e.message;
		} else {
			error = e.toString();
		}
	}

	async function submit() {
		let username = usernameField.value;
		let password = passwordField.value;
		let confrimPassword = confrimPasswordField.value;

		let promise = await permission_promise;
		if (promise.captcha && !captchaResponse) {
			error = "Captcha Required";
			return;
		}

		try {
			await Account.register(username, password, confrimPassword, captchaResponse);
		} catch (e) {
			handleError(e);
			return;
		}

		location.href = "/";
	}

	let usernameField: HTMLInputElement;
	let passwordField: HTMLInputElement;
	let confrimPasswordField: HTMLInputElement;
	let captchaResponse: string | null | undefined;
</script>

<div>
	<input bind:this="{usernameField}" class="input" type="username" placeholder="Username" />
	<input
		bind:this="{passwordField}"
		class="input"
		type="password"
		placeholder="Confirm Password"
		value="asdbhjfbikasdfjasdf"
	/>
	<input
		bind:this="{confrimPasswordField}"
		class="input"
		type="password"
		placeholder="Password"
		value="asdbhjfbikasdfjasdf"
	/>
	{#await permission_promise then permission}
		{#if permission.captcha}
			<HCaptcha bind:token="{captchaResponse}" />
		{/if}
	{/await}
	<input on:click="{submit}" id="submit" type="submit" value="Register" />
</div>

<style>
	div {
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

	input#submit {
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
