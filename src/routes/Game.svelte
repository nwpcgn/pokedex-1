<script lang="ts">
	import { path } from 'elegua'
	import { game, player, enemy } from '../lib/game.svelte.ts'
	import PkmnCard from '../lib/battle/PkmnCard.svelte'
	import PkmnWorld from '../lib/battle/PkmnWorld.svelte'
	import sleep from '../lib/utils/sleep.js'
	const views = [
		{
			slug: 'fight',
			title: 'Tempel',
			component: fightTemp
		},
		{
			slug: 'world',
			title: 'Map',
			viewType: 'page',
			component: PkmnWorld
		},
		{
			slug: 'arena',
			title: 'Arena',
			viewType: 'page',
			component: arenaTemp
		},
		{
			slug: 'result',
			title: 'Finish',
			viewType: 'page'
		}
	]
	let viewId = $state(0)

	$effect(() => {
		if (player.pokemon && enemy.pokemon) {
			// viewId = 2
		}
	})
</script>

{@render views[viewId]?.component()}

{#snippet fightTemp()}
	<section class="page-layer center nwp">
		{#if player?.pokemon}
			<article class="content">
				<div class="grid gap-4 md:grid-cols-2">
					<div class="rounded-box shadow-sm">
						<PkmnCard expand current={player.pokemon}></PkmnCard>
					</div>
					{#if enemy.pokemon}
						<div class="rounded-box shadow-sm">
							<PkmnCard expand current={enemy.pokemon}></PkmnCard>
						</div>
					{:else}
						<div class="rounded-box bg-base-300 grid place-content-center">
						</div>
					{/if}
				</div>
			</article>
			<article class="content flex justify-center">
				<div class="join">
					<button
						onclick={() => {
							player.reset()
						}}
						class="btn join-item w-32">Change Pkmn</button>
					<button
						onclick={async () => {
							const obj = game.getPkmn()
							enemy.reset()
							await sleep(400)
							enemy.add(obj)
						}}
						class="btn join-item w-32"
						>{enemy.pokemon ? 'Skip' : 'Find'}</button>

					<button
						class="btn join-item w-32"
						onclick={() => {
							viewId = 2
						}}
						disabled={!enemy.pokemon}>Select</button>
				</div>
			</article>
		{:else}
			<article class="content">
				<div class="md: grid grid-cols-3 gap-4">
					{#each game.select as current}
						<button
							onclick={() => {
								player.add(current)
							}}
							class="rounded-box cursor-pointer shadow-sm">
							<PkmnCard {current}></PkmnCard>
						</button>
					{/each}
				</div>
			</article>
			<article class="content flex justify-center">
				<div class="btn btn-disabled">
					<span>Press Card to Select</span>
				</div>
			</article>
		{/if}
	</section>
{/snippet}

{#snippet arenaTemp()}
	<section class="page-layer center nwp">
		{#if viewId == 2}
			<article class="content">
				<div class="md: grid grid-cols-2 gap-4">
					<PkmnCard current={player.pokemon}></PkmnCard>
					<PkmnCard current={enemy.pokemon}></PkmnCard>
				</div>
			</article>
			<article class="content flex justify-center gap-2">
				<button
					class="btn"
					onclick={() => {
						enemy.reset()
						player.reset()
						viewId = 0
					}}>
					<span>Reset Battle</span>
				</button>
				<div
					class="btn"
					onclick={() => {
						3
						viewId = 3
					}}>
					<span>Start Battle</span>
				</div>
			</article>
		{/if}
	</section>
{/snippet}
