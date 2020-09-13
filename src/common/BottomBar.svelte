<script>
  import { onMount } from "svelte";

  import ResizeObserver from "resize-observer-polyfill";

  let showFade;
  let scroll;
  let nav;
  let space;

  onMount(() => {
    if (!window.IntersectionObserver) return;
    function update(entries, observe) {
      entries.forEach(({ isIntersecting, target, intersectionRatio }) => {
        showFade = !isIntersecting;
      });
    }

    const observer = new IntersectionObserver(update, {
      //  root: document.body,
      rootMargin: "0px",
      threshold: [0, 1]
    });
    observer.observe(scroll);
    return () => {
      observer.unobserve(scroll);
    };
  });
</script>

<style>
  nav {
    height: 96px;
    width: 100vw;
    box-sizing: border-box;
    display: grid;
    grid-auto-flow: column;
    position: fixed;
    justify-content: space-between;
    bottom: 0;
    padding: 24px 18px;
    background: var(--white);
  }

  .space {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: rgba(0, 15, 23, 0.1) 0px 0.2rem 1rem 0px,
      rgba(0, 15, 23, 0.1) 0px 0.45rem 1rem 0px;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }

  .showFade {
    opacity: 1;
  }

  .clickThrough {
    position: relative;
    top: 95px;
    height: 1px;

    width: 1px;
    left: 0;
    background: transparent;
  }
</style>
<div class="clickThrough" bind:this={scroll}/>
<nav bind:this={nav}>
<div class="space" class:showFade/>
<!-- <div class="shadow" class:showFade/> -->
<slot />
</nav>