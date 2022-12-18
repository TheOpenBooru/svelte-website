<script lang="ts">
	import Auth from "lib/Auth/index.svelte";
	import HeadInfo from "lib/HeadInfo.svelte";
</script>

<HeadInfo
	title="Login"
	description="Login into your account"
	path="/account/login"
/>
<Auth mode="login" />
