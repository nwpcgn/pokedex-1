<script lang="ts">
	import { game } from '../lib/game.svelte.ts'
</script>

<div class="content">
	{#each game.views as { title, slug }, i}
		<div class:text-info={i == game.current}>{i} - {title}</div>
	{/each}
</div>
