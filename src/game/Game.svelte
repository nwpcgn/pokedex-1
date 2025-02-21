<script lang="ts">
	import PkmnList from './pkmn/PkmnList.svelte'
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

	const restart = () => {
		viewId = 0
	}

	const handlePkmnSelect = async ({ id, name, type, base }) => {
		console.log({ id, name, type, base })
	};
	

	$effect(async () => {
		if (view?.viewType === 'layer') {
			await sleep(2000)
			next()
		}
	})
</script>

{#snippet loadEl()}
	<section class="page-layer center nwp bg-neutral">
		<article class="p-8">
			<span class="loading loading-xl loading-spinner text-info"></span>
		</article>
	</section>
{/snippet}

{#snippet header()}
	<div class="rounded-box px-6 py-3 shadow">
		<div class="flex items-center justify-between">
			<div class="text-xl font-bold">{view?.title}</div>
			<div class="font-bold">{viewId} / {viewEnd}</div>
		</div>
	</div>
{/snippet}

{#snippet landingEl()}
	<section class="page-layer nwp">
		<article class="content">
			{@render header()}

			<nav class="flex gap-2 py-4">
				<button class="btn" onclick={next}> Next Step </button>
				{#if viewId == viewEnd}
					<button class="btn" onclick={restart}> Restart </button>
				{:else}
					<button class="btn" onclick={restart}> Exit </button>
				{/if}
			</nav>
		</article>
	</section>
{/snippet}

{#snippet fightEl()}
	<section class="page-layer nwp">
		<article class="content">
			{@render header()}
			<PkmnList {handlePkmnSelect}></PkmnList>
		</article>
	</section>
{/snippet}

{#snippet arenaEl()}
	<section class="page-layer nwp">
		<article class="content">
			<hgroup>
				<h3>{view?.title}</h3>
				<h4>{viewId} / {viewEnd}</h4>
			</hgroup>
			<nav class="flex gap-2 py-4">
				<button class="btn" onclick={next}> Next Step </button>
				{#if viewId == viewEnd}
					<button class="btn" onclick={restart}> Restart </button>
				{:else}
					<button class="btn" onclick={restart}> Exit </button>
				{/if}
			</nav>
		</article>
	</section>
{/snippet}

{#snippet opponEl()}
	<section class="page-layer nwp">
		<article class="content">
			<hgroup>
				<h3>{view?.title}</h3>
				<h4>{viewId} / {viewEnd}</h4>
			</hgroup>
			<nav class="flex gap-2 py-4">
				<button class="btn" onclick={next}> Next Step </button>
				{#if viewId == viewEnd}
					<button class="btn" onclick={restart}> Restart </button>
				{:else}
					<button class="btn" onclick={restart}> Exit </button>
				{/if}
			</nav>
		</article>
	</section>
{/snippet}
{#snippet resultEl()}
	<section class="page-layer nwp">
		<article class="content">
			<hgroup>
				<h3>{view?.title}</h3>
				<h4>{viewId} / {viewEnd}</h4>
			</hgroup>
			<nav class="flex gap-2 py-4">
				<button class="btn" onclick={next}> Next Step </button>
				{#if viewId == viewEnd}
					<button class="btn" onclick={restart}> Restart </button>
				{:else}
					<button class="btn" onclick={restart}> Exit </button>
				{/if}
			</nav>
		</article>
	</section>
{/snippet}
{@render page?.()}
