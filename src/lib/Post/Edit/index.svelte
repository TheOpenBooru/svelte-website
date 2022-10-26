<script lang="ts">
	import type { Types  } from "openbooru";
	import { post_edit } from "js/booru";
	import Captcha from "lib/Captcha.svelte";
	import TagEditor from "lib/TagEditor/index.svelte";
	import SourceInput from "./SourceInput.svelte";
	import RatingSelector from "./RatingSelector.svelte";
	import About from "lib/Info/About.svelte";
	export let post: Types.Post;


	let captcha: string|null = null;
	let tags = post.tags;
	let source = post.source;
	let rating = post.rating;


	async function AttemptEdit() {
			try {
					await post_edit(post.id, source, rating, Array.from(tags));
			} catch (error){
					alert("An Error has occured: " + error.message);
					return;
			}

			window.location.reload();
	}
</script>

<div id="container">
	<div id="tag">
			<TagEditor baseTags={post.tags} bind:tags={tags} />
	</div>
	<div id="inputs">
			<SourceInput bind:source={source} originalSource={post.source}/>
			<RatingSelector bind:rating={rating} />
			<div id="captcha">
					<Captcha bind:token={captcha}/>
			</div>
			<button on:click={AttemptEdit}>Submit</button>
		</div>
</div>

<style>
	div#container{
		height: 100%;
		width: 50rem;
		padding: 1rem;
	
		display: flex;
		flex-flow: row nowrap;
	}


	div#inputs {
			height: 100%;
			padding: .5rem;
			gap: .2rem;

			display: flex;
			flex-flow: column nowrap;
			align-content: space-between;
	}

	div#tag {
			height: 100%;
			width: 25rem;
	}

	div#captcha { 
			display:flex;
			justify-content: center;
			align-items: center;
	}

	button {
		position: relative;
		width: 100%;
		height: 1.5rem;
		left: 1rem;
		top: 1rem;
	}
	</style>