<script lang="ts">
	import type { Route } from '@mateothegreat/svelte5-router'
	import { route, Router, goto } from '@mateothegreat/svelte5-router'
	import Pkmn from '../lib/battle/Pkmn.svelte'
	const routes: Route[] = [
		{
			path: '',
			component: Pkmn
		},
		{
			path: 'start',
			component: select
		}
	]
</script>

<Router basePath="/" {routes} />


{#snippet select()}
	<section class="page-layer nwp">
		<article class="content">
			<h1 class="text-4xl font-bold">Pkmn Select</h1>
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
