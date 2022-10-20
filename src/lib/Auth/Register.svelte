<script lang="ts">
  function submit(){
    let username = usernameField.value;
    let password = passwordField.value;
    let confrimPassword = confrimPasswordField.value;
    let captcha = null;
  };

  let usernameField: HTMLInputElement;
  let passwordField: HTMLInputElement;
  let confrimPasswordField: HTMLInputElement;
</script>

<div>
    <input bind:this={usernameField} class="input" type="username" placeholder="Username" />
    <input bind:this={passwordField} class="input" type="password" placeholder="Confirm Password" />
    <input bind:this={confrimPasswordField} class="input" type="password" placeholder="Password" />
    <input on:click={submit} id="submit" type="submit" value="Login"/>
</div>

<style>
  div{
    width: 100%;
    display:flex;
    flex-flow: nowrap column;
    justify-content: center;
    align-items: center;
    gap:.2rem;
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