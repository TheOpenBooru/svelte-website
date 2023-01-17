<script lang="ts">
  import { AGE_RESTRICTED } from "js/config"
  import CookiePrompt from "./CookiePrompt.svelte";
  import AgePrompt from "./AgePrompt.svelte";

  let shouldPromptAge: boolean = false;
  let shouldPromptCookies: boolean = false;
</script>

{#if AGE_RESTRICTED}
  <AgePrompt bind:shouldPrompt={shouldPromptAge}/>
{/if}
<CookiePrompt bind:shouldPrompt={shouldPromptCookies}/>