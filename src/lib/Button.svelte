<script lang="ts">
  export let src: string = "/favicon.ico";
  export let name: string = "Lorum";
  export let callback: Function = () => {};
</script>


<button>
    <img src={src} alt={name} on:click={() => callback()}/>
</button>

<style>
  button {
    aspect-ratio: 1/1;
    width: 2.5rem;
    height: 2.5rem;
    
    margin: 0.2rem;

    padding: 0.2rem;
    
    background-color: var(--BACKGROUND-3);
    border: 0.15rem solid var(--BORDER-1);
    border-radius: 0.4rem;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  button:hover {
      background-color: var(--BACKGROUND-3-HOVER);
  }

  img {
    filter: invert(0%);
    
    animation-fill-mode: forwards;
    transition: 0.2s ease-in-out;
  }

  button:hover img {
      filter: invert(90%);
  }
</style>

