<script lang="ts">
	import { player, enemy } from './../game.svelte.ts'
	import copyToClip from '$lib/utils/copyToClip.js'
	import sleep from '$lib/utils/sleep.js'
	const icons = [
		'pkmn-back',
		'pkmn-left',
		'pkmn-right',
		'pkmn-close',
		'pkmn-blank',
		'pkmn-search',
		'pkmn-sort',
		'pkmn-height',
		'pkmn-tag',
		'pkmn-text_format',
		'pkmn-weight',
		'pkmn-pokeball',
		'pkmn-favicon',
		'pkmn-hp',
		'pkmn-level'
	]
	let { selected } = $props()

	let msg = $state('blank')
	let isOpen = $state(false)
	const showMsg = async () => {
		isOpen = true
		await sleep(2000)
		isOpen = false
	}
	const copyIcon = async () => {
		const [txt, count] = await copyToClip(JSON.stringify(selected.base))
		msg = `JSON Base  copied! Length:   ${count}`
		showMsg()
		enemy.add(selected)
	}
	const copyIconList = async () => {
		const [txt, count] = await copyToClip(JSON.stringify(selected))
		msg = `JSON Pkmn  copied! Length:   ${count}`
		showMsg()
		player.add(selected)
	}

	$inspect('Player', player.pokemon)
	$inspect('Enemy', enemy.pokemon)
</script>

{#snippet pokeT()}
	<textarea class="textarea w-full" rows="3"
		>{JSON.stringify(selected.base, null, 2)}</textarea>
	<div class="flex justify-between gap-4">
		<span>{selected.name}</span><span>{selected.id}</span>
	</div>
	<!-- <div class="inline-grid">
		{#each Object.entries(selected.base) as [k, v]}
			<div class="flex justify-between gap-4">
				<span>{k}</span>
				
				<span>{v}</span>
			</div>
		{/each}
	</div> -->
{/snippet}

<div class="space-y-4 py-4">
	{@render pokeT()}
	<div class="flex items-center justify-between">
		<div class="join">
			<label class="btn btn-sm join-item">Copy</label>
			<button onclick={copyIcon} class="btn btn-sm join-item">
				<svg class="pkmn-icon"><use xlink:href="#pkmn-favicon"></use></svg>
				<span class="sr-only">Copy Icon</span>
			</button>
			<button onclick={copyIconList} class="btn btn-sm join-item">
				<svg class="pkmn-icon"><use xlink:href="#pkmn-sort"></use></svg>
				<span class="sr-only">Copy List</span>
			</button>
		</div>

		<form method="dialog">
			<button class="btn btn-sm btn-neutral" style="--fs: 12px;">
				<span class="sr-only-x">Close</span>
				<svg class="pkmn-icon pkmn-close"
					><use xlink:href="#pkmn-close"></use></svg>
			</button>
		</form>
	</div>

	<div role="alert" class="alert" class:opacity-0={!isOpen}>
		<span></span>
		<span>{msg}</span>
	</div>
</div>
