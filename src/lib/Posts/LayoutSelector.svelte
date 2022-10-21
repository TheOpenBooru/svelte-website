<script lang="ts">
	import { page } from "$app/stores"
  import Button from "lib/Button.svelte";
  import Column from "lib/Posts/Column/index.svelte";
  import Grid from "lib/Posts/Grid/index.svelte";
  
  export let layout: string;
  
  let query = $page.url.search;
</script>

<div>
  <Button
    name="Grid"
    src="/images/grid.svg"
    href={"/posts/grid" + query}
    active={layout === "grid"}
  />
    <Button
    name="Column"
    src="/images/columns.svg"
    href={"/posts/column" + query}
    active={layout === "column"}
  />
</div>

<style>
  div{
		position: absolute;
		left: 0;

		z-index: 1;
    border-radius: .5rem;
    margin: .4rem;
    
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: .2rem
  }
  
  div.mobile{
    margin-right: 0rem;
  }
</style>
