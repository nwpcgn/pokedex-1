<script lang="ts">
	import { onMount } from 'svelte'
	import { enemy, game } from '../game.svelte.js'
	import paginate from '../utils/paginate.js'
	import sleep from '../utils/sleep.js'
	let maps = $state.raw([
		{
			id: '002a57b6-eeb6-45ba-afb1-603bb5d2ff1a',
			width: 12,
			height: 12,
			styleMap: [
				'tile-blank',
				'tile-floor',
				'tile-wall',
				'tile-enemy',
				'tile-player',
				'tile-loot'
			],
			output: [
				1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1,
				1, 1, 1, 1, 1, 1, 2, 3, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 5, 2, 1,
				0, 0, 1, 1, 1, 1, 2, 2, 1, 2, 2, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
				0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
				0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1
			]
		}
	])
	let options = $state.raw({
		width: 12,
		height: 12,
		size: 500,
		loot: 5,
		enemy: 3,
		wall: 2,
		blank: 0,
		styleMap: [
			'tile-blank',
			'tile-floor',
			'tile-wall',
			'tile-enemy',
			'tile-player',
			'tile-loot'
		]
	})
	let levelId = $state(0)
	let enemyActive = $state(false)
	let lootActive = $state(false)
	let grid = $state([])

	const getGridItem = (arr = [], x = 0, y = 0) => {
		const curr = arr[y][x]
		return curr
	}

	const checkGridItem = async (x = 0, y = 0) => {
		const curr = getGridItem(grid, x, y)

		if (curr == options.enemy) {
			enemyActive = true
			const obj = game.getPkmn()
			await sleep(2000)
			enemy.add(obj)
		}
		if (curr == options.loot) {
			lootActive = true
			await sleep(2000)
		}
		if (curr == options.wall || curr == options.blank) {
			console.log('Cant move')
			return
		}

		grid[game.world.y][game.world.x] = 1

		game.world.update(x, y)
	}

	const initWorld = () => {
		grid = paginate(maps[levelId].output, options.width)

		grid[game.world.y][game.world.x] = 4

		console.log(grid[game.world.y][game.world.x])
	}

	onMount(() => {
		initWorld()
	})
</script>

<section class="page-layer center nwp">
	<div class="battle-grid-wrapp">
		<div class="battle-grid" class:lootActive class:enemyActive>
			{#each grid as row, y}
				{#each row as col, x}
					{#if game.world.x == x && game.world.y == y}
						<div class="tile-player">
							<span>@</span>
						</div>
					{:else}
						<button
							onclick={(e) => {
								const dataset = e.currentTarget.dataset
								const x = parseInt(dataset.x)
								const y = parseInt(dataset.y)
								checkGridItem(x, y)
							}}
							data-x={x}
							data-y={y}
							class="cursor-pointer {options.styleMap[col]}">
							<span>{col}</span>

							<span class="sr-only">{x}/{y}</span>
						</button>
					{/if}
				{/each}
			{/each}
		</div>
	</div>
</section>
