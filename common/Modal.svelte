<script>
		import { createEventDispatcher, onDestroy } from "svelte";
		import Button from "./Button.svelte";
		import { fade, scale } from "svelte/transition";

		const dispatch = createEventDispatcher();
		const close = () => dispatch("close");

		let modal;

		const handle_keydown = e => {
		  if (e.key === "Escape") {
		    close();
		    return;
		  }

		  if (e.key === "Tab") {
		    // trap focus
		    const nodes = modal.querySelectorAll("*");
		    const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0);

		    let index = tabbable.indexOf(document.activeElement);
		    if (index === -1 && e.shiftKey) index = 0;

		    index += tabbable.length + (e.shiftKey ? -1 : 1);
		    index %= tabbable.length;

		    tabbable[index].focus();
		    e.preventDefault();
		  }
		};

		const previously_focused =
		  typeof document !== "undefined" && document.activeElement;

		if (previously_focused) {
		  onDestroy(() => {
		    previously_focused.focus();
		  });
		}
</script>

<svelte:window on:keydown={handle_keydown}/>

<div class="modal-background" on:click={close} transition:fade={{duration:200}}></div>

<div class="modal" role="dialog" aria-modal="true" bind:this={modal} transition:fade={{duration:200}}>
	<slot name="header"></slot>

	<slot></slot>

</div>

<style>
	.modal-background {
	  position: fixed;
	  z-index: 1;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  background: rgba(0, 0, 0, 0.8);
	}

	.modal {
	  z-index: 1;
	  position: absolute;
	  left: 50%;
	  top: 50%;
	  width: calc(100vw - 4em);
	  max-width: 32em;
	  height: min-content;
	  overflow: auto;
	  transform: translate(-50%, -50%);
	  padding: 1em;
	  border-radius: 10px;
	  background: white;
	  box-shadow: 0 0 20px rgba(0, 0, 0, 1);
	}
</style>
