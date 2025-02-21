<script lang="ts">
	import PkmnCard from './PkmnCard.svelte'

	import { player, enemy, game, getTypeStyle } from '../game.svelte.js'
	let { handleAction } = $props()
	let current = $state({} | null)

	const skip = () => {
		current = game.getPkmn()
	}
	skip()
</script>

{#if current}
	<PkmnCard {current}></PkmnCard>
	<div class="flex justify-center">
		<div class="join">
			<button class="btn join-item" onclick={() => handleAction(current)}
				>Select</button>
			<button class="btn join-item" onclick={skip}>Skip</button>
		</div>
	</div>
{/if}
