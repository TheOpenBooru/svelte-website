<script lang="ts">
  export let mode: string;
</script>

<div id="container">
  <a href="/account/login" class="left {mode === 'login' ? 'active' : ''}">
    Login
  </a>
  <a href="/account/register" class="right {mode === 'register' ? 'active' : ''}">
    Register
  </a>
</div>

<style>
  div#container{
    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 1rem;
  }

  a.active{
    background: var(--BACKGROUND-4);
  }

  a{
    width: 100%;
    background: var(--BACKGROUND-3);

    cursor: pointer;
    user-select: none;
    
    border: 0 solid var(--BORDER-1);
    border-bottom-width: 0.2rem;
    
    color: black;
    text-align: center;
    vertical-align: middle;
    line-height: 2rem;
    font-size: larger;

    transition: background ease-out 0.1s;
  }

  a:hover{
    background: var(--BACKGROUND-4-HOVER) !important;
  }

  a.left{
    border-radius: 0.8rem 0 0 0;
    border-right-width: 0.15rem;
  }
  
  a.right{
    border-radius: 0 0.8rem 0 0;
    border-left-width: 0.15rem;
  }
</style>
