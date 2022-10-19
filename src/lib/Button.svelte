<script lang="ts">
  export let src: string = "/favicon.ico";
  export let name: string = "Lorum";
  export let href: string = "";
  export let callback: Function = () => {};
  export let active: boolean = false;
</script>

{#if href}
  <a href={href}>
    <button>
        <img src={src} alt={name}/>
    </button>
  </a>
{:else}
  <button>
      <img src={src} alt={name} on:click={() => callback()}/>
  </button>
{/if}

<style>
  button {
    aspect-ratio: 1/1;
    width: 2.5rem;
    height: 2.5rem;
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
    width: 100%;
    height: 100%;
    
    filter: invert(0%);
    
    animation-fill-mode: forwards;
    transition: 0.2s ease-in-out;
  }

  button:hover img,
  a.active {
      filter: invert(90%);
  }
</style>

