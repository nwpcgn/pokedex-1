<script lang="ts">
	import copyToClip from '$lib/utils/copyToClip.js'
	import sleep from '$lib/utils/sleep.js'
	const icons = [
		'pkmn-back',
		'pkmn-left',
		'pkmn-right',
		'pkmn-close',
		'pkmn-blank',
		'pkmn-search',
		'pkmn-sort',
		'pkmn-height',
		'pkmn-tag',
		'pkmn-text_format',
		'pkmn-weight',
		'pkmn-pokeball',
		'pkmn-favicon',
		'pkmn-hp',
		'pkmn-level'
	]
	let { icon } = $props()
	let name = $derived(icons.includes(icon) ? icon : 'pkmn-blank')

	let msg = $state('blank')
	let isOpen = $state(false)
	const showMsg = async () => {
		isOpen = true
		await sleep(2000)
		isOpen = false
	}
	const copyIcon = async () => {
		const [txt, count] = await copyToClip(
			`<svg class="pkmn-icon ${name}"><use xlink:href="#${name}"></use></svg>`
		)
		msg = `Icon Template copied! Length:   ${count}`
		showMsg()
	}
	const copyIconList = async () => {
		const [txt, count] = await copyToClip(JSON.stringify(icons))
		msg = `JSON List  copied! Length:   ${count}`
		showMsg()
	}
</script>

{#snippet iconTag(name)}
	<textarea class="textarea w-full"
		><svg class="pkmn-icon {name}"><use xlink:href="#{name}"></use></svg></textarea>
{/snippet}
{#snippet iconT(name)}
	<span style="--fs: 24px;"
		><svg class="pkmn-icon {name}"><use xlink:href="#{name}"></use></svg></span>
{/snippet}

{#snippet modalT()}
	<div class="space-y-4 py-0">
		<div class="flex items-center gap-4 py-2 text-lg uppercase">
			{@render iconT(name)}
			<span>{icon ? icon.replace('_', ' ') : 'No Icon selected'}</span>
		</div>

		{@render iconTag(name)}
		<div class="flex items-center justify-between">
			<div class="join">
				<label class="btn btn-sm join-item">Copy</label>
				<button onclick={copyIcon} class="btn btn-sm join-item">
					<svg class="pkmn-icon"><use xlink:href="#pkmn-favicon"></use></svg>
					<span class="sr-only">Copy Icon</span>
				</button>
				<button onclick={copyIconList} class="btn btn-sm join-item">
					<svg class="pkmn-icon"><use xlink:href="#pkmn-sort"></use></svg>
					<span class="sr-only">Copy List</span>
				</button>
			</div>

			<form method="dialog">
				<button class="btn btn-sm btn-neutral" style="--fs: 12px;">
					<span class="sr-only-x">Close</span>
					<svg class="pkmn-icon pkmn-close"
						><use xlink:href="#pkmn-close"></use></svg>
				</button>
			</form>
		</div>

		<div role="alert" class="alert" class:opacity-0={!isOpen}>
			<span></span>
			<span>{msg}</span>
		</div>
	</div>
{/snippet}

{@render modalT()}
