<script lang="ts">
  import { page } from '$app/stores';
  import HeadInfo from 'lib/HeadInfo.svelte';
</script>

<HeadInfo
	title="Error"
	path="/"
	description="This page has failed to load correctly"
	keywords={["404", "505", "error"]}
/>
<h1>{$page.status} - {$page?.error?.message}</h1>

<style>
	h1 {
		font-size: 3rem;
		width: 100vw;
		text-align: center;
	}
</style>
