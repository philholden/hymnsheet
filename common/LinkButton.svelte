<script>
  import { link } from "svelte-spa-router";
  export let href = "/";
</script>

<style>
	a {
	  background: #ff3e00;
	  color: white;
	  border: none;
	  padding: 8px 12px;
	  border-radius: 2px;
	  text-decoration: none;
	  display: block;
	  line-height: 40px;
	}
	a:hover,
	a:active {
	  bsackground: #ff6f00;
	}
</style>

<a on:click use:link={href} >
  <slot /> 
</a>