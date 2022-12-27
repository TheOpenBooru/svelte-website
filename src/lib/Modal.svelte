<script lang="ts" context="module">
	export function show() {
		searchModal.show();
	}

	export function hide() {
		searchModal.close();
	}

	export function toggle() {
		if (searchModal.open) {
			hide();
		} else {
			show();
		}
	}

	let searchModal: HTMLDialogElement;
</script>

<dialog bind:this="{searchModal}"></dialog>

<style>
	dialog {
		position: fixed;
		top: calc(var(--NAVBAR-HEIGHT) + 3rem);
		background: none;
		border: none;
		z-index: 1;
	}

	dialog::backdrop {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.8);
	}
 </style>
