<script lang="ts">
	import type { Pokemon } from './Pokemon'
	import pokemons from './pokedex.json'
	import { fetchData, paginate, shuffle, sleep } from '../utils'
	let dialog = $state()
	let { handlePkmnSelect } = $props()
	let pokedex: Pokemon | [] = $state(pokemons)
	let tabSize = $state(8)
	let tabId = $state(0)
	let tabArr = $derived(paginate(pokedex, tabSize))
	let tabList = $derived(tabArr[tabId])
	let selectedMonster: Pokemon = $state({} | null)
	let disabledNext = $derived(tabId >= tabArr.length - 1)

	let promise = sleep()

	const typeColor = {
		Normal: '#A8A878',
		Fire: '#F08030',
		Water: '#6890F0',
		Electric: '#F8D030',
		Grass: '#78C850',
		Ice: '#98D8D8',
		Fighting: '#C03028',
		Poison: '#A040A0',
		Ground: '#E0C068',
		Flying: '#A890F0',
		Psychic: '#F85888',
		Bug: '#A8B820',
		Rock: '#B8A038',
		Ghost: '#705898',
		Dragon: '#7038F8',
		Dark: '#EE99AC',
		Steel: '#B8B8D0'
	}

	const getTypeStyle = (key) => {
		const color = typeColor[key] ? typeColor[key] : '#fefefe'
		const style = `background-color: ${color};`
		return style
	}
</script>

{#await promise then _}
	<div class="w-full p-2">
		<div class="flex flex-col gap-2">
			{#each tabList as { id, name, type, base } (id)}
				<button
					onclick={() => {
						selectedMonster = { id, name, type, base }
						dialog.showModal()
					}}
					role="alert"
					class="alert alert-vertical sm:alert-horizontal cursor-pointer">
					<span class="text-4xl font-thin tabular-nums opacity-30"
						>#{id.toString().padStart(3, '0')}</span>
					<div>
						<h3 class="flex items-center gap-4">
							<span class="mb-2 text-xl font-bold">{name}</span>
						</h3>
					</div>
					<div class="flex gap-1">
						{#each type as item}
							<span
								class="rounded-full px-3 py-1 font-thin"
								style={getTypeStyle(item)}>{item}</span>
						{/each}
					</div>
				</button>
			{/each}
		</div>
	</div>
	<div class="flex justify-center">
		<nav class="join py-4">
			<button
				class="btn join-item btn-lg"
				onclick={() => {
					if (tabId > 0) {
						tabId = tabId - 1
					}
				}}
				disabled={tabId <= 0}>
				<svg class="pkmn-icon pkmn-left"
					><use xlink:href="#pkmn-left"></use></svg>
				<span class="sr-only">Back</span>
			</button>
			<div>
				<div class="btn join-item btn-lg">
					{(tabId + 1).toString().padStart(2, '0')} / {tabArr.length}
				</div>
			</div>

			<button
				class="btn join-item btn-lg"
				onclick={() => {
					if (!disabledNext) {
						tabId = tabId + 1
					}
				}}
				disabled={disabledNext}>
				<svg class="pkmn-icon pkmn-right"
					><use xlink:href="#pkmn-right"></use></svg>
				<span class="sr-only">Next</span>
			</button>
		</nav>
	</div>
{/await}

{#snippet pkmnInfo({ id, name, type, base })}
	<h3 class="text-lg font-bold">{name}</h3>
	<div>#{id.toString().padStart(3, '0')}</div>
	<div class="flex gap-1">
		{#each type as item}
			<span class="rounded-full px-3 py-1 font-thin" style={getTypeStyle(item)}
				>{item}</span>
		{/each}
	</div>
{/snippet}

<dialog bind:this={dialog} class="modal">
	<div class="modal-box">
		{#if selectedMonster}
			{@render pkmnInfo(selectedMonster)}
		{/if}

		<div class="modal-action">
			{#if selectedMonster}
				<button class="btn" onclick={() => handlePkmnSelect(selectedMonster)}
					>Select</button>
			{/if}
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
