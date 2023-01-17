<script lang="ts">
	import { page } from "$app/stores";
	import ButtonsBox from "./ButtonsContainer.svelte";
	import Button from "lib/Button.svelte";

	export let layout: string;

	let query = $page.url.search;
</script>

<ButtonsBox position="left">
	<Button
		name="Grid"
		src="/images/grid.svg"
		href="{'/posts/grid' + query}"
		active="{layout === 'grid'}"
	/>
	<Button
		name="Column"
		src="/images/columns.svg"
		href="{'/posts/column' + query}"
		active="{layout === 'column'}"
	/>
</ButtonsBox>
