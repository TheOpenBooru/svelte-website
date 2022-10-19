<script lang="ts">
  import Login from "lib/Auth/Login.svelte";
</script>

<main>
  <div>
    <Login callback={console.log}/>
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
  div{
    height: 10rem;
    width: clamp(200px, 40%,  400px);

    display: flex;
    place-items: center;
  }
</style>