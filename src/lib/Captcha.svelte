<script lang="ts" global>
	///<reference types="@hcaptcha/types"/>
	import SvelteHcaptcha from "svelte-hcaptcha";
	import { getSitekey } from "js/booru";

	export let token: string | null = null;
	export let darkMode: boolean = false;
	export let compact: boolean = false;

	function handleSuccess(e: Event) {
		// @ts-ignore
		let new_token: string = e.detail.token;
		token = new_token;
		console.log(new_token);
	}
</script>

{#await getSitekey() then sitekey}
	<!-- @ts-ignore -->
	<SvelteHcaptcha
		sitekey="{sitekey}"
		theme="{darkMode ? 'dark' : 'light'}"
		size="{compact ? 'compact' : 'normal'}"
		on:success="{handleSuccess}"
	/>
{/await}
