<script lang="ts">
	let { options, grid, enemyActive, lootActive, handleGridItemClick } = $props()

	const getStyle = [
		'tile-blank',
		'tile-floor',
		'tile-wall',
		'tile-enemy',
		'tile-player',
		'tile-loot'
	]
</script>

<div
	class="battle-grid"
	class:lootActive
	class:enemyActive
	style="--gg-rw: {options.width}; --gg-rh: {options.height}; --gg-rs: {options.size}px;">
	{#each grid as row, y}
		{#each row as col, x}
			<button
				onclick={handleGridItemClick}
				data-x={x}
				data-y={y}
				class="cursor-pointer {getStyle[col]}"
				class:bg-neutral={col == 1}>
				{#if col == 0}
					<span></span>
				{:else}
					<span>{col}</span>
				{/if}
				<span class="sr-only">{x}/{y}</span>
			</button>
		{/each}
	{/each}
</div>

<style>
</style>
