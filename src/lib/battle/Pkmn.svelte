<script lang="ts">
	import { player, enemy, game } from '../game.svelte.ts'
	import PkmnCard from './PkmnCard.svelte'
	import sleep from '../utils/sleep.js'
	let current = $state({} | null)

	$effect(() => {
		if (player?.pokemon) {
			current = player.pokemon
		}
	})
</script>

{#if current}
	<div>Current Fighter</div>
	<PkmnCard {current}></PkmnCard>
{:else}
	<div>No Fighter</div>
{/if}
