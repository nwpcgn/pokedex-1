<script>
	import sprites from './sprites.json'
	import icons from './icons.json'
</script>

{#each Object.values(sprites) as sprite}
	{@html sprite}
{/each}
