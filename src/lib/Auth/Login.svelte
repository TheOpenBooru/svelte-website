<script lang="ts">
  export let error: string = "";
  export let callback: (username: string, password: string) => void;

  function submit(){
    callback(usernameField.value, passwordField.value)
  };

  let usernameField: HTMLInputElement;
  let passwordField: HTMLInputElement;
</script>

<main>
  <div id="container">
    {#if error}
    <span>{error}</span>
    {/if}
    <div id="input-container">
        <input bind:this={usernameField} class="input" type="username" placeholder="Username" />
        <input bind:this={passwordField} class="input" type="password" placeholder="Password" />
        <input on:click={submit} id="submit" type="submit" value="Login"/>
    </div>
  </div>
</main>

<style>
  main{
    border: 3px solid var(--BORDER-1);
    background-color: var(--BACKGROUND-3);
    transition: 0.15s ease-out;
  
    width: 100%;
    height: 100%;
    min-width: 320px;
    border-radius: 1rem;
    padding: 1rem;
    
    display: flex;
    flex-flow: nowrap column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  div#container {
    width:100%;
  }

  div#input-container{
    width:100%;
    display:flex;
    flex-flow: nowrap column;
    justify-content: center;
    align-items: center;
    gap:.2rem;
  }

  span {
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    font-weight: bolder;

  }

  input.input {
    font-size: larger;
    border-radius: 0.5rem;

    background-color: var(--BACKGROUND-2);
    border-color: var(--BACKGROUND-4);
    color: black;

    width: calc(100% - 1.5rem);
    max-width: 40rem;
  }

  input.input::placeholder {
      opacity: 0.8;
      color: black;
  }

  input#submit {
    height: 2rem;
    width: 100%;
    max-width: 30rem;
    margin-top:1rem;
    
    border-radius: 1rem;
    font-size: large;
    font-weight: bold;
  
    background-color: var(--BACKGROUND-4);
    border-color: var(--BORDER-1);
  }
</style>