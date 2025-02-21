<script lang="ts">
	let { children } = $props()
</script>

<div class="battle-arena">
	{@render children()}
</div>

<style>
	.battle-arena {
		width: 500px;
		height: 500px;
		display: grid;
		overflow: hidden;
		aspect-ratio: 1/1;
		position: relative;
		background-color: var(--gb-400);
		grid-template: 1 / 1;
	}
</style>
