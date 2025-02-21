<script>
	let { dialog = $bindable(), children, header, onClose } = $props()
</script>

<dialog
	bind:this={dialog}
	class="modal"
	onclose={onClose}
	onclick={(e) => {
		if (e.target === dialog) dialog.close()
	}}>
	<div class="modal-box">
		{@render header?.()}

		{@render children?.()}
	</div>
</dialog>
