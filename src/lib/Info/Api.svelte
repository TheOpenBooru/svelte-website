<script lang="ts">
	import { API_URL } from "js/config";
	
	export const csr = true;
</script>

<div>
	Open Booru is built around a backend API, this is accessbile to users so that custom clients can
	be made.
	<br />
	All functions on this site are implemented through the API.
	<br />
	<br />
	You can access the api and documentation at
	<a href="{API_URL}">
		{API_URL}
	</a>
	<br />
	Source Code:
	<a href="https://github.com/TheOpenBooru/api"> https://github.com/TheOpenBooru/api </a>
</div>

<style>
	div {
		padding: 0.5rem;
		font-size-adjust: 0.7;
	}
</style>
