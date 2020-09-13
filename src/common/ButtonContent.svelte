<script>
  import { link } from "svelte-spa-router";
  import Icon from "./Icon.svelte";
  export let href;
  export let icon;
  export let title;
</script>
<style>
								.outer {
								  background: var(--white);
								  color: var(--text1);
								  border: none;
								  padding: 10px 18px;
								  border-radius: var(--radius-md);
								  text-decoration: none;
								  display: grid;
								  grid-gap: 12px;
								  font-size: 16px;
								  line-height: 1.6;
								}

								.oneCol {
								  grid-template-columns: 1fr;
								}
								.twoCol {
								  grid-template-columns: min-content 1fr;
								}
								.desc {
								  color: var(--text2);
								  padding-bottom: 3px;
								}
								.title {
								  padding-top: 3px;
								  padding-bottom: 7px;
								  font-weight: bold;
								}
</style>

<a use:link={href} on:click class="outer" class:twoCol={icon}>
  {#if icon}
    <Icon name={icon} size={36} />
  {/if}
  <div>
    {#if title}<div class="title">{title}</div>{/if}
    <div class="desc"><slot/> </div>
  </div>
</a>