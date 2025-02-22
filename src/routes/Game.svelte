<script lang="ts">
  import Start from './Start.svelte';

	import { game } from '../lib/game.svelte.ts'
	import sleep from '../lib/utils/sleep.js'
	let view = $derived(game.views[game.viewId])
	const next = () => {
		const newValue = game.current + 1
		console.log({ newValue })
		game.current = newValue
	}
	const back = () => {
		const newValue = game.current - 1
		game.current = newValue
	}

	$effect(async () => {
		if (game.current == 0) {
			await sleep(2000)
			next()
		}
	})
    $inspect(game.views)
</script>

{#if game.viewId == 1}
	<section class="page-layer nwp">
		{#if view}
			{@render header()}
            <Start></Start>
		{/if}
	</section>
{:else if game.viewId == 2}
	<section class="page-layer nwp">
		{#if view}
			{@render header()}
		{/if}
	</section>
{:else}
	{@render loaderComp()}
{/if}

{#snippet header()}
	<header class="content">
		<div class="rounded-box px-6 py-3 shadow">
			<div class="flex items-center justify-between">
				<div class="text-xl font-bold">{view?.title}</div>
				<div class="join">
					<button onclick={back} class="join-item btn btn-sm btn-square"
						><svg class="pkmn-icon pkmn-left"
							><use xlink:href="#pkmn-left"></use></svg
						></button>
					<div class="join-item btn btn-sm">
						{game.viewId} / {game.views.length - 1}
					</div>
					<button onclick={next} class="join-item btn btn-sm btn-square"
						><svg class="pkmn-icon pkmn-right"
							><use xlink:href="#pkmn-right"></use></svg
						></button>
				</div>
			</div>
		</div>
	</header>
{/snippet}
{#snippet loaderComp()}
	<section class="page-layer center nwp bg-neutral">
		<article class="p-8">
			<span class="loading loading-xl loading-spinner text-info"></span>
		</article>
	</section>
{/snippet}
