<script lang="ts">
	import sprites from './lib/sprites/sprites.json'
	import Game from './game/Game.svelte'
</script>

<main class="main">
	<Game></Game>
</main>

{#each Object.values(sprites) as sprite}
	{@html sprite}
{/each}
