<script>
  import { link } from "svelte-spa-router";
  import Icon from "./Icon.svelte";
  export let href = "/";
  export let icon = "edit";
</script>

<style>
					a {
					  color: var(--text2);
					  border: none;
					  border-radius: 2px;
					  text-decoration: none;
					  display: grid;
					  grid-auto-flow: column;
					  align-items: center;
					  justify-content: space-between;
					  line-height: 52px;
					  border-bottom: 1px solid var(--line);
					  font-size: 18px;
					}
					a:hover,
					a:active {
					  bsackground: #ff6f00;
					}
</style>

<a on:click use:link={href} >
  <slot /> <Icon name={icon} color="var(--line)"/>
</a>