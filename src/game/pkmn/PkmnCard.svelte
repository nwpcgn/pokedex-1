<script lang="ts">
	import { getTypeStyle } from '../game.svelte.js'
	let { current } = $props()
</script>

<section class="flex flex-col p-4">
	<header class="text-center text-3xl font-extrabold capitalize">
		{current.name}
	</header>
	<figure class="flex justify-center py-2">
		<img
			alt=""
			src="/img/pkmn/thumbnails/{current.id.toString().padStart(3, '0')}.png" />
	</figure>
	<div class="flex justify-center gap-2">
		<div class="flex items-center gap-2">
			<svg class="pkmn-icon pkmn-tag"><use xlink:href="#pkmn-tag"></use></svg>
			<span class="text-xl font-bold"
				>{current.id.toString().padStart(3, '0')}</span>
		</div>
		<div class="divider divider-horizontal"></div>
		<div class="flex items-center gap-2">
			<svg class="pkmn-icon pkmn-hp"><use xlink:href="#pkmn-hp"></use></svg>
			<span class="text-xl font-bold">{current.base.HP}</span>
		</div>
	</div>
	<!---->
	<article>
		<div class="flex justify-center gap-4 py-4">
			{#each current.type as item}
				<span
					class="rounded-full px-4 py-1 font-thin"
					style={getTypeStyle(item)}>{item}</span>
			{/each}
		</div>
		<!---->
	</article>
	<footer>
		<div class="grid gap-1 py-2">
			{#if Object.entries(current.base)}
				{#each Object.entries(current.base) as [label, val]}
					<div class="flex items-center justify-between gap-2 capitalize">
						<span class="w-1/4 truncate italic">{label.replace('_', ' ')}</span>
						<progress class="progress w-full" max="100" value={val}></progress>
						<span class=" font-bold">{val}</span>
					</div>
				{/each}
			{/if}
		</div>
		<!---->
	</footer>
</section>
