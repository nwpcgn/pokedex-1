<script lang="ts">
	import type { Base } from './type'
	import PokeModal from './PokeModal.svelte'
	import Modal from './Modal.svelte'
	let dialog = $state()
	import paginate from '$lib/utils/paginate.js'
	import { send, receive } from './transitions.js'
	class Fighter {
		id: number = $state()
		name: string = $state()
		type?: string[] | null = $state()
		base: Base | null = $state()

		constructor(id, name, type, base) {
			this.id = id
			this.name = name
			this.type = type
			this.base = base
		}
	}
	let {
		table = $bindable(),
		listSize = 5,
		card = false,
		grid = false
	} = $props()
	let listId = $state(0)
	let selectedMonster = $state({} | null)
	let list = $derived(paginate(table, listSize))

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

<Modal bind:dialog>
	{#snippet header()}
		<h3 class="text-lg font-bold">Pokedex</h3>
	{/snippet}
	<PokeModal selected={selectedMonster}></PokeModal>
</Modal>

{#if card}
	{@render cardT()}
{:else}
	{@render gridT()}
{/if}

{@render tabBarT()}

{#snippet tabBarT()}
	<div class="flex justify-center">
		<nav class="join py-4">
			<button class="btn join-item btn-sm">
				<svg class="pkmn-icon pkmn-left"
					><use xlink:href="#pkmn-left"></use></svg>
				<span class="sr-only">Back</span>
			</button>
			<div>
				{#each list as _, i}
					<button
						onclick={() => {
							listId = i
						}}
						class="btn join-item btn-sm"
						class:btn-secondary={i == listId}
						>{(i + 1).toString().padStart(2, '0')}</button>
				{/each}
			</div>
			<button class="btn join-item btn-sm">
				<svg class="pkmn-icon pkmn-right"
					><use xlink:href="#pkmn-right"></use></svg>
				<span class="sr-only">Next</span>
			</button>
		</nav>
	</div>
{/snippet}

{#snippet cardT()}
	<div class="w-full p-2">
		<div class="img-grid" style="--min: 80px;">
			{#each list[listId] as { id, name, type, base } (id)}
				<div class="pkmn-flip-card">
					<div class="caption"></div>
					<div class="index">#{id.toString().padStart(3, '0')}</div>
					<div class="figure">
						<img
							class="h-full"
							src="/img/pkmn/thumbnails/{id.toString().padStart(3, '0')}.png"
							alt="" />
					</div>
					<div class="caption-text">{name}</div>
				</div>
			{/each}
		</div>
	</div>
{/snippet}

{#snippet gridT()}
	<div class="w-full p-2">
		<div class="flex flex-col gap-2">
			{#each list[listId] as { id, name, type, base } (id)}
				<button
					onclick={() => {
						selectedMonster = { id, name, type, base }
						dialog.showModal()
					}}
					in:receive={{ key: id }}
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
								class="rounded-full px-3 py-2 font-thin"
								style={getTypeStyle(item)}>{item}</span>
						{/each}
					</div>
				</button>
			{/each}
		</div>
	</div>
{/snippet}
