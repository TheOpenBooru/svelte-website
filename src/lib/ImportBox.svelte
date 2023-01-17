<script lang="ts" context="module">
	export let toggle = () => visible = !visible;
	export let hide = () => visible = false;
	let visible = false;
</script>

<script lang="ts">
	import Modal from "lib/Modal.svelte";
	import Captcha from "lib/Captcha.svelte";
	import LoadingIcon from "lib/LoadingIcon.svelte";
	import Links from "js/links";
	import { posts_import } from "js/booru";

	let captchaRequired = false;
	let loading = false;
	let errorText: string | null = null;
	let captchaResponse: string | null = null;
	let url = "";

	async function FormHandler(e: SubmitEvent|any) {
		e.preventDefault();

		if (url == "") {
			showError("Please submit a valid URL");
			return;
		}

		if (captchaRequired && captchaResponse === null) {
			showError("Please Solve the Captcha");
			return;
		}

		loading = true;
		try {
			let posts = await posts_import(url, captchaResponse);
			let id = posts[0].id;
			location.href = Links.post(id);
		} catch (e) {
			// TODO: Add Differentated Errors
			showError("Failed to import post");
		}
		loading = false;
	}

	function showError(msg: string) {
		errorText = msg;
		setTimeout(() => (errorText = null), 5000);
	}
</script>

<Modal {visible}>
	<form on:submit={FormHandler}>
     
    <!-- Error -->
    {#if errorText}
      <span id="error">
        {errorText}
      </span>
    {/if}
    <!-- Input -->
		<div id="url-contianer">
			<label for="url">URL:</label>
			<input type="url" name="url" bind:value="{url}" required />
		</div>
		{#if captchaRequired}
			<Captcha bind:token="{captchaResponse}" />
		{/if}
    <!-- Submit -->
		{#if loading}
			<div id="loading">
				<LoadingIcon />
			</div>
		{:else}
			<input type="submit" value="Create" />
		{/if}
	</form>
</Modal>

<style>
	form {
		width: 30rem;
		height: 10rem;

		background-color: var(--BACKGROUND-4);
		border: 0.2em solid var(--BORDER-1);
		border-radius: 1rem;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	div#loading {
		width: 100%;
		padding: 0.5rem;
		margin: 0.5rem;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	div#url-contianer {
		width: 95%;
		margin: 0.5rem;
		padding: 0.5rem;
	}

	input[type="url"] {
		width: calc(100% - 5rem);
	}

	input[type="submit"] {
		cursor: pointer;
		user-select: none;

		width: 100%;

		background: var(--BACKGROUND-3);

		border: 0 solid var(--BORDER-1);
		border-top-width: 0.2rem;
		border-radius: 0 0 1rem 1rem;

		text-align: center;
		vertical-align: middle;
		line-height: 2rem;
		font-size: larger;

		transition: all ease-out 0.1s;
	}

	input[type="submit"]:hover {
		background: var(--BACKGROUND-3-HOVER) !important;
	}
	
	span#error {
		color: red;
	}
</style>
