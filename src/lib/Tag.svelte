<script lang="ts">
	import type { Types } from 'openbooru';
	export let tagName: string | null = null;
	export let data: Types.Tag | null = null;
	export let href: string | null = null;
	export let callback: Function | null = null;
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
	<span class={`namespace-${namespace}`}>
		{name}
	</span>
	{#if showCount && count !== null}
		{count}
	{/if}
	<slot />
</a>

<style>
	span {
		display: flex;
		gap: 0.2rem;
		align-items: center;
		justify-content: left;

		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

		text-decoration: none;
		width: fit-content;

		border: 0.1rem solid var(--BORDER-2);
		border-radius: 1rem;
		background: var(--BACKGROUND-4);

		padding: 0 0.3rem;

		color: black;
	}

	span .namespace-copyright {
		color: #f0a0f0;
	}

	span .namespace-character {
		color: #f0f0a0;
	}

	span .namespace-creator {
		color: #f0a0a0;
	}

	span .namespace-meta {
		color: #90d9ed;
	}
</style>
