<script lang="ts">
	import Modal from './Modal.svelte'
	import PkmnInfo from './PkmnInfo.svelte'
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
	let dialog = $state()
	let icon = $state()
	function showInfo(name): String {
		icon = name

		dialog.showModal()
	}
</script>

{#snippet iconT(name)}
	<svg class="pkmn-icon"><use xlink:href="#{name}"></use></svg>
{/snippet}

<div class="img-grid" style="--fs: 40px; --min: 80px;">
	{#each icons as icon}
		<figure>
			<button
				onclick={() => showInfo(icon)}
				class="grid cursor-pointer place-content-center"
				>{@render iconT(icon)}</button>

			<figcaption>{icon}</figcaption>
		</figure>
	{/each}
</div>

<Modal bind:dialog>
	{#snippet header()}
		<h3 class="text-lg font-bold">Pokedex</h3>
	{/snippet}
	<PkmnInfo {icon} />
</Modal>
