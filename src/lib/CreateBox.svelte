<script lang="ts" context="module">
	export let toggle = () => {};
	export let hide = () => {};
  
  // import { Errors, Posts } from "js/booru";
  // import styled from "styled-components";
  // import usePermission from "hooks/permissionHook";
  // import Captcha from "components/Captcha";
  // import LoadingIcon from "components/LoadingIcon";
  // import Redirects from "js/redirects";

  // export default function CreatePost() {
  //     let [captchaResponse, setCaptchaResponse] = useState(null);
  //     let {captcha: captchaRequired} = usePermission("canCreatePosts")
  //     let [loading, setLoading] = useState(false);
  //     let fileRef = useRef()


  //     function showText(msg) {
  //         alert(msg)
  //     }

  //     async function FormHandler(e) {
  //         e.preventDefault();
  //         if (!fileRef) return
          
  //         // @ts-ignore
  //         let file = fileRef.current.files[0]
          
  //         if (captchaRequired && captchaResponse === null) {
  //             showText("Please Solve the Captcha")
  //             return
  //         }
          
  //         setLoading(true);
  //         try {
  //             let post = await Posts.create(file, captchaResponse);
  //             Redirects.goto(Redirects.post(post.id))
  //         } catch (e) {
  //             setLoading(false)
  //             if (e === Errors.PermisionError) {
  //                 showText("Error: Post Already Exists");
  //             } else if (e === Errors.PostAlreadyExists) {
  //                 showText("Error: You don't have the permission to do this");
  //             } else {
  //                 showText("Error: " + e.message);
  //             }
  //         }
  //     }

  //     return (
  //         <Container onSubmit={FormHandler}>
  //             <FileInput type="file" accept="video/*,image/*" ref={fileRef}/>
  //             <br />
  //             <br />
  //             { captchaRequired ? <Captcha setCaptchaToken={setCaptchaResponse} /> : null}
  //             <br />
  //             {loading
  //                 ? <LoadingContainer><LoadingIcon /></LoadingContainer>
  //                 : <Button type="submit" value="Create" />
  //             }
  //         </Container>
  //     );
  // }

  // const Container = styled.form`
  //     width: 30rem;
  //     height: 10rem;
      
  //     background-color: var(--BACKGROUND-4);
  //     border: 0.2em solid var(--BORDER-1);
  //     border-radius: 1rem;

  //     display: flex;
  //     flex-direction: column;
  //     align-items: center;
  //     justify-content: space-between;
  // `;

  // const LoadingContainer = styled.div`
  //     width: 100%;
  //     padding: 0.5rem;
  //     margin: 0.5rem;

  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  // `

  // const FileInput = styled.input`
  // `

  // const Button = styled.input`
  //     bottom:0;
  //     width: 100%;

  //     cursor: pointer;
  //     user-select: none;

  //     background: var(--BACKGROUND-3);

  //     border: 0 solid var(--BORDER-1);
  //     border-top-width: 0.2rem;
  //     border-radius: 0 0 1rem 1rem;

  //     text-align: center;
  //     vertical-align: middle;
  //     line-height: 2rem;
  //     font-size: larger;

  //     & .active {
  //         border-color: var(--BORDER-2);
  //     }

  //     transition: all ease-out 0.1s;
  //     &:hover {
  //         background: var(--BACKGROUND-3-HOVER) !important;
  //     }
  // `
</script>


<script lang="ts">
  import Modal from "lib/Modal.svelte";
  import Captcha from "lib/Captcha.svelte"
  import LoadingIcon from "lib/LoadingIcon.svelte"
  import Links from "js/links"
  import { posts_create } from "js/booru"

  let captchaRequired = false;
  let loading = false;
  let errorText: string|null = null;
  let captchaResponse: string|null = null;
  let fileElem: null|HTMLInputElement = null;
  
  async function FormHandler(e: Event) {
    e.preventDefault();
    if (!fileElem) return;
      
    
    if (fileElem.files?.length != 1) {
      showError("Please submit a single image");
      return;
    }
    let file = fileElem.files[0];
    
    if (captchaRequired && captchaResponse === null) {
      showError("Please Solve the Captcha");
      return;
    }

    loading = true;
    try {
      await posts_create(file, captchaResponse);
      location.href = Links.posts()
    } catch (e) {
      // TODO: Add Differentated Errors
      showError("Failed to import post");
    }
    loading = false;
  }

  function showError(msg: string) {
      errorText = msg;
      setTimeout(() => errorText = null, 5000)
  }
</script>

<Modal>

  <form on:submit={FormHandler}>
    <!-- Error -->
    {#if errorText}
      <span id="error">
        {errorText}
      </span>
    {/if}
    <!-- Input -->
    <div id="url-contianer">
        <label for="url">URL:</label>
        <input type="url" name="url" bind:this={fileElem} required/>
    </div>
    {#if captchaRequired}
      <Captcha bind:token={captchaResponse}/>
    {/if}
    <!-- Submit  -->
    {#if loading}
      <div id="loading">
        <LoadingIcon />
      </div>
    {:else}
      <input type="submit" value="Create" />
    {/if}
  </form>
</Modal>

<style>
  form {
    width: 30rem;
    height: 10rem;
    
    background-color: var(--BACKGROUND-4);
    border: 0.2em solid var(--BORDER-1);
    border-radius: 1rem;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  span#error {
    color: red;
  }

  div#loading {
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem;
    
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div#url-contianer {
    width: 95%;
    margin: 0.5rem;
    padding: 0.5rem;
  }

  input[type="url"] {
  padding: 0.5rem;
  margin: 0.5rem;
  max-width: 20rem;
  }

  input[type="submit"] {
  cursor: pointer;
  user-select: none;
  
  width: 100%;
  
  background: var(--BACKGROUND-3);
  
  border: 0 solid var(--BORDER-1);
  border-top-width: 0.2rem;
  border-radius: 0 0 1rem 1rem;
  
  text-align: center;
  vertical-align: middle;
  line-height: 2rem;
  font-size: larger;

  transition: all ease-out 0.1s;
  }
  
  input[type="submit"]:hover {
    background: var(--BACKGROUND-3-HOVER) !important;
  }
</style>