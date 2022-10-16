<script lang="ts">
	import type { Types } from "openbooru";

	export let path: string;
	export let title:string = "";
	export let description: string = "";
	export let keywords: string[] = [];
	export let image: Types.Image|null = null;
	export let video: Types.Video|null = null;

  const SiteUrl = "http://localhost:5173";
  const SiteName = "Open Booru";
  const SiteDescription = "The Open Booru";

  let RenderedTitle = title ? `${SiteName} | ${title}` : SiteName
  let RenderedDescription = description ? SiteDescription + "\n" + description : SiteDescription
</script>



<svelte:head>
    <title>{RenderedTitle}</title>
    <meta name="description" content={RenderedDescription} />
    <meta name="keywords" content={keywords.join(", ")}/>
    <meta name="author" content="Ben Brady" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
                
    {#if path}<link rel="canonical" href={SiteUrl + path} />{/if}
    
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content={SiteName} />
    <meta property="og:title" content={RenderedTitle} />
    <meta property="og:description" content={RenderedDescription} />
    {#if path} <meta property="og:url" content={path} />{/if}
    
    {#if image} <meta property="og:image" content={image.url} /> {/if}
    {#if image} <meta property="og:image:width" content={image.width.toString()} />{/if}
    {#if image} <meta property="og:image:height" content={image.height.toString()} />{/if}
    {#if image} <meta property="og:image:secure_url" content={image.url} />{/if}
    {#if video} <meta property="og:video" content={video.url} />{/if}
    
    <meta property="twitter:title" content={RenderedTitle} />
    <meta property="twitter:description" content={RenderedDescription}/>
    {#if path} <meta property="twitter:url" content={SiteUrl + path} />{/if}
    
    {#if image} <meta property="twitter:card" content="summary_large_image" />{/if}
    {#if image} <meta property="twitter:image" content={image.url} />{/if}
                
    {#if video} <meta property="twitter:card" content="player" />{/if}
    {#if video} <meta property="twitter:player" content={video.url} />{/if}
    {#if video} <meta property="twitter:player:width" content={video.width.toString()} />{/if}
    {#if video} <meta property="twitter:player:height" content={video.height.toString()} />{/if}
</svelte:head>