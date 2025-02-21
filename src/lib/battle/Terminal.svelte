<script lang="ts">
	import { onMount } from 'svelte'
	let {
		steps = [
			{
				action: 'command',
				command: 'mkdir example',
				transcription: 'create directory'
			},
			{
				action: 'command',
				command: 'cd example',
				transcription: 'cd into directory'
			}
		]
	} = $props()
	let index = 0
	let current = $state()
	let currentEditorIndex = 0
	let currentEditorCommand
	let lines = $state([])
	let selections = []
	let transcription = $state()

	let nextTimer, typeTimer, transitionTimer, editorCommandTimer

	onMount(() => {
		nextTimer = next()
	})

	function next() {
		current = { ...steps[index] }

		if (current.action == 'command' || current.action == 'editor') {
			current.typed = ''
			current.index = 0
			typeTimer = setTimeout(type, 0)
		} else if (current.action == 'wait') {
			index += 1
			nextTimer = setTimeout(next, current.delay || 1000)
		}
	}

	function type() {
		const char = current.command[current.index]
		current = { ...current, typed: current.typed + char }
		transcription = current.transcription || ''

		current.index += 1

		if (current.index < current.command.length) {
			typeTimer = setTimeout(type, 50)
		} else {
			if (current.action == 'editor') {
				transitionTimer = setTimeout(openEditor, 1000)
			} else {
				scheduleTransition()
			}
		}
	}

	function scheduleTransition() {
		const delay = transcription ? 1500 : 300
		transitionTimer = setTimeout(transition, delay)
	}

	function openEditor() {
		current.lines = current.content.split('\n')

		transcription = ''
		current.showEditor = true
		current.selections = []

		editorCommandTimer = setTimeout(nextEditorCommand, 1000)
	}

	function transition() {
		index += 1
		lines = [...lines, current]
		current = null
		transcription = ''

		nextTimer = setTimeout(next, 200)
	}

	function nextEditorCommand() {
		currentEditorCommand = current.steps[currentEditorIndex]
		currentEditorIndex += 1
		transcription = currentEditorCommand.transcription

		if (currentEditorCommand.action == 'close') {
			// editorCommandTimer = setTimeout(closeEditor, currentEditorCommand.delay)
		} else if (currentEditorCommand.action == 'select') {
			const { from, to, style } = currentEditorCommand
			const selection = { from, to, style }

			selections.push(selection)
			selections = selections
			current = current

			console.log(selections)
			editorCommandTimer = setTimeout(
				nextEditorCommand,
				currentEditorCommand.delay
			)
		}
	}

	function isSelected(line, char) {
		if (!selections) return false

		console.log({ line, char }, selections)

		selections.forEach(({ from, to }) => {
			debugger
			if (
				from.line >= line &&
				char >= from.char &&
				to.line >= line &&
				to.char >= char
			)
				return true
		})

		return false
	}

	function closeEditor() {
		current.showEditor = false
		selections = []
		scheduleTransition()
	}

	function reset() {
		clearTimeout(nextTimer)
		clearTimeout(typeTimer)
		clearTimeout(transitionTimer)
		clearTimeout(editorCommandTimer)

		current = null
		index = 0
		lines = []
		transcription = null
		selections = []

		currentEditorIndex = 0
		currentEditorCommand = null

		nextTimer = setTimeout(next, 1000)
	}
</script>

<svelte:window onclick={reset} />

<section class="page-layer nwp">
	<article class="content">
		<section class="terminal">
			<div class="bar">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="54"
					height="14"
					viewBox="0 0 54 14">
					<g fill="none" fill-rule="evenodd" transform="translate(1 1)">
						<circle
							cx="6"
							cy="6"
							r="6"
							fill="#FF5F56"
							stroke="#E0443E"
							stroke-width=".5" />
						<circle
							cx="26"
							cy="6"
							r="6"
							fill="#FFBD2E"
							stroke="#DEA123"
							stroke-width=".5" />
						<circle
							cx="46"
							cy="6"
							r="6"
							fill="#27C93F"
							stroke="#1AAB29"
							stroke-width=".5" />
					</g>
				</svg>
			</div>

			{#each lines as line}
				<p>
					<span class="prompt">&gt;</span>
					{line.command}
				</p>

				{#if line.output}
					<p class="output">
						{#each line.output.split('\n') as outputLine}
							{outputLine}<br />
						{/each}
					</p>
				{/if}
			{/each}

			{#if current && (current.action == 'command' || current.action == 'editor')}
				<p>
					<span class="prompt">&gt;</span>
					{current.typed}
				</p>
			{/if}

			{#if current && current.action == 'editor' && current.showEditor}
				<div class="editor">
					{#each current.lines as line, lineIndex}
						{#if current.lineNumbers}<span class="line-number"
								>{lineIndex + 1}</span
							>{/if}
						{#each line.split() as char, charIndex}
							<span class:highlight={isSelected(lineIndex, charIndex)}
								>{char}</span>
						{/each}<br />
					{/each}<span class="cursor"></span>
				</div>
			{/if}

			<div class="transcription-wrapper">
				<div class="transcription" class:visible={!!transcription}>
					{transcription}
				</div>
			</div>
		</section>
	</article>
</section>
