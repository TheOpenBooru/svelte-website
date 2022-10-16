<script lang="ts">
	import type { Types } from "openbooru";

	export let path: string;
	export let title:string = "";
	export let description: string = "";
	export let keywords: string[] = [];
	export let media: Types.Media|null = null;

  const SiteUrl = "https://ptr.openbooru.org";
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
    <link rel="canonical" href={SiteUrl + path} />
    
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content={SiteName} />
    <meta property="og:title" content={RenderedTitle} />
    <meta property="og:description" content={RenderedDescription} />
    <meta property="og:url" content={path} />

    <meta property="twitter:title" content={RenderedTitle} />
    <meta property="twitter:description" content={RenderedDescription}/>
    <meta property="twitter:url" content={SiteUrl + path} />
    
    {#if media?.type == "image" || media?.type == "animation"}
      <meta property="og:image:url" content={media.url} />
      <meta property="og:image:secure_url" content={media.url} />
      <meta property="og:image:width" content={media.width.toString()} />
      <meta property="og:image:height" content={media.height.toString()} />
      <meta property="og:image:type" content={media.mimetype} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content={media.url} />
    {:else if media?.type == "video"}
      <meta property="og:video:url" content={media.url} />
      <meta property="og:video:secure_url"  content={media.url} />
      <meta property="og:video:type" content={media.mimetype} />
      <meta property="og:video:width" content={media.width.toString()} />
      <meta property="og:video:height" content={media.height.toString()} />

      <meta property="twitter:card" content="player" />
      <meta property="twitter:player" content={media.url} />
      <meta property="twitter:player:width" content={media.width.toString()} />
      <meta property="twitter:player:height" content={media.height.toString()} />
    {/if}
</svelte:head>