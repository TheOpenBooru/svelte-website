<script lang="ts">
	import type { Types } from 'openbooru';
	export let tagName: string | null = null;
	export let data: Types.Tag | null = null;
	export let href: string | null = null;
	export let callback: null|(() => void) = null;
	export let showCount: boolean = false;

	const name = tagName ?? data?.name ?? 'Foo';
	const namespace = data?.namespace ?? 'generic';
	const count = data?.count ?? null;

	function onClick(e: MouseEvent) {
		if (callback){
			e.preventDefault();
			callback();
		}
	}
</script>

<a {href} on:click={onClick}>
	<span class={namespace}>
		{name}
		{#if showCount && count !== null}
			{count}
		{/if}
		<slot />
	</span>
</a>

<style>
	a {
		text-decoration: none;
		width: fit-content;
		height: fit-content;
	}

	span {
		display: flex;
		gap: 0.2rem;
		align-items: center;
		justify-content: left;

		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		
		border: 0.1rem solid var(--BORDER-2);
		border-radius: 1rem;
		background: var(--BACKGROUND-4);
		
		padding: 0 0.3rem;

		color: black;
	}

	span.copyright {
		color: #f0a0f0;
	}

	span.character {
		color: #f0f0a0;
	}

	span.creator {
		color: #f0a0a0;
	}

	span.meta {
		color: #90d9ed;
	}
</style>
