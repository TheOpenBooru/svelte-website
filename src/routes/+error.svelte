<script lang="ts">
  import { page } from '$app/stores';
</script>

<h1>{$page.status} - {$page.error.message}</h1>

<style>
	h1 {
		font-size: 3rem;
		width: 100vw;
		text-align: center;
	}
</style>
