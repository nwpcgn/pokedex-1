<script lang="ts">
	import GetPkmn from './pkmn/GetPkmn.svelte'
	import { player, enemy, game } from './game.svelte.ts'
	import PkmnCard from './pkmn/PkmnCard.svelte'
	import sleep from '../lib/utils/sleep'
	const views = [
		{
			slug: 'loadEl',
			title: 'Loading Screen',
			viewType: 'layer',
			order: 0
		},
		{
			slug: 'landingEl',
			title: 'Landing Page',
			viewType: 'page',
			order: 1
		},
		{
			slug: 'fightEl',
			title: 'Fighter Page',
			viewType: 'page',
			order: 2
		},
		{
			slug: 'opponEl',
			title: 'Opponent Page',
			viewType: 'page',
			order: 3
		},
		{
			slug: 'arenaEl',
			title: 'Arena Page',
			viewType: 'page',
			order: 4
		},
		{
			slug: 'resultEl',
			title: 'Result Page',
			viewType: 'page',
			order: 5
		}
	]
	const pages = [loadEl, landingEl, fightEl, opponEl, arenaEl, resultEl]

	let viewId = $state(0)
	let viewEnd = $state(views.length - 1)
	let view = $derived(views[viewId])
	let page = $derived(pages[viewId])
	const next = () => {
		if (viewId < viewEnd) {
			viewId = viewId + 1
		} else {
			console.log('View End')
		}
	}
	const back = () => {
		if (viewId > 0) {
			viewId = viewId - 1
		} else {
			console.log('View Start')
		}
	}

	const restart = () => {
		viewId = 0
	}

	const handlePkmnSelect = async (obj) => {
		if (viewId == 2) {
			player.add(obj)
			viewId = 3
		} else if (viewId == 3) {
			enemy.add(obj)
			viewId = 4
		}
	}
	$inspect('Player', player.pokemon)
	$inspect('Enemy', enemy.pokemon)
	$effect(async () => {
		if (view?.viewType === 'layer') {
			await sleep(2000)
			player.reset()
			enemy.reset()
			next()
		}
	})
</script>

<section class="page-layer nwp flex flex-col">
	{@render header()}
	<article class="content flex-1 space-y-4">
		{@render page?.()}
	</article>
	{@render foobar()}
</section>

{#snippet loadEl()}
	<section class="page-layer center nwp bg-neutral">
		<article class="p-8">
			<span class="loading loading-xl loading-spinner text-info"></span>
		</article>
	</section>
{/snippet}

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
					<div class="join-item btn btn-sm">{viewId} / {viewEnd}</div>
					<button onclick={next} class="join-item btn btn-sm btn-square"
						><svg class="pkmn-icon pkmn-right"
							><use xlink:href="#pkmn-right"></use></svg
						></button>
				</div>
			</div>
		</div>
	</header>
{/snippet}
{#snippet foobar()}
	<footer class="content flex gap-4">
		<span class="flex-1"></span>
		<nav class="join">
			{#if viewId == viewEnd}
				<button class="join-item btn-square btn" onclick={restart}>
					<svg class="pkmn-icon pkmn-back"
						><use xlink:href="#pkmn-back"></use></svg>
					<span class="sr-only">restart</span>
				</button>
			{:else}
				<button class=" join-item btn-square btn" onclick={restart}>
					<svg class="pkmn-icon pkmn-close"
						><use xlink:href="#pkmn-close"></use></svg>
					<span class="sr-only">Exit</span>
				</button>
				<button class=" btn join-item btn-square" onclick={next}>
					<svg class="pkmn-icon pkmn-right"
						><use xlink:href="#pkmn-right"></use></svg>
					<span class="sr-only">next</span>
				</button>
			{/if}
		</nav>
	</footer>
{/snippet}

{#snippet pkmnT()}
	<GetPkmn handleAction={handlePkmnSelect}></GetPkmn>
{/snippet}
{#snippet landingEl()}
	<div>
		Der Spieler wird von Professor Eich zurückgerufen, als er das hohe Gras
		betreten will. Im Labor des Professors werden dem Protagonisten und dem
		Rivalen drei Pokébälle, in denen sich die Starter-Pokémon befinden, gezeigt.
		Nachdem der Protagonist eines von ihnen gewählt hat, sucht sich der Rivale
		das taktisch überlegene Pokémon aus und fordert den Protagonisten sofort zu
		einem Kampf heraus. Nach diesem Kampf bittet der Professor den Protagonisten
		um einen Gefallen. Dieser reist daraufhin nach Vertania City, wo er ein
		Paket für den Professor abholen soll. Auf dem Weg in diese Stadt bestreitet
		er erste Kämpfe gegen Trainer und wilde Pokémon. Wieder zurück in Alabastia
		überreicht Professor Eich den beiden rivalisierenden Protagonisten den
		Pokédex, eine Maschine, mit der man Daten sämtlicher Pokémon registrieren
		kann. Nun ist der Protagonist bereit für das Abenteuer, in dem er viele
		Kämpfe bestreiten, den Pokédex durch das Fangen von Pokémon füllen und
		natürlich Freundschaft zu seinen Pokémon aufbauen wird.
	</div>
{/snippet}

{#snippet fightEl()}
	{@render pkmnT()}
{/snippet}
{#snippet opponEl()}
	{@render pkmnT()}
{/snippet}

{#snippet arenaEl()}
	<div>
		{#if player.pokemon}
			<PkmnCard current={player.pokemon} />
		{/if}
		{#if enemy.pokemon}
			<PkmnCard current={enemy.pokemon} />
		{/if}
	</div>
{/snippet}

{#snippet resultEl()}
	<div>
		<hgroup>
			<h1>Result</h1>
		</hgroup>
	</div>
{/snippet}
