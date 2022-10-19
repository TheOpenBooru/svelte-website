<script lang="ts">
  import Button from "lib/Button.svelte";
  import Column from "lib/Posts/Column/index.svelte";
  import Grid from "lib/Posts/Grid/index.svelte";
  
  export let layout;
</script>

<div>
  <Button
    name="Grid"
    src="/images/grid.svg"
    href="/posts/grid"
    active={layout === Grid}
    />
    <Button
    name="Column"
    src="/images/columns.svg"
    href="/posts/column"
    active={layout === Column}
  />
</div>

<style>
  div{
		position: absolute;
		right: 1.2rem;

		margin: .4rem;
		z-index: 1;
    border-radius: .5rem;

    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: .2rem
  }
</style>
