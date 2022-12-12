<script lang="ts">
	import HeadInfo from "lib/HeadInfo.svelte";
	import ProfilePage from "lib/Profile/Page.svelte";
</script>

<HeadInfo title="{`Profile`}" description="{`Viewing your own use profile`}" path="{`/profile`}" />
<ProfilePage />
