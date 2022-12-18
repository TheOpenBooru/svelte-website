<script lang="ts">
	import Auth from "lib/Auth/index.svelte";
	import HeadInfo from "lib/HeadInfo.svelte";
</script>

<HeadInfo
	title="Register"
	description="Register for a new account"
	path="/account/register"
/>
<Auth mode="register" />
