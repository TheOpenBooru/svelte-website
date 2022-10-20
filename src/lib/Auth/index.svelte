<script lang="ts">
  import Login from "./Login.svelte";
  import Register from "./Register.svelte";
  import Buttons from "./Buttons.svelte";

  export let mode: "login"|"register" = "login";
  let error = "";
</script>

<main>
  <div id="positioner">
    <div id="elem-container">
      <Buttons {mode}/>
      <div id="container">
        {#if mode === "login"}
          <Login/>
        {:else}
          <Register/>
        {/if}
      </div>
      {#if error}
        <span>
          {error}
        </span>
      {/if}
      </div>
  </div>
</main>

<style>
  main{
    height: 100%;
    width: 100%;
    margin-top: 5%;
    display: flex;
    align-items: baseline;
    justify-content: center;
  }

  div#container{
    padding: 1rem;
  }

  div#positioner{
    height: 100%;
    width: 100%;
    margin-top: 5%;
    display: flex;
    align-items: baseline;
    justify-content: center;
  }

  div#elem-container{
    height: fit-content;
    min-height: fit-content;
    width: 24rem;


    border: 3px solid var(--BORDER-1);
    background-color: var(--BACKGROUND-3);
    border-radius: 1rem;
  }

  span {
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    font-weight: bolder;
  }
</style>