<script>
  import Icon from "./Icon.svelte";
  export let value;
  export let style = "";
  export let placeholder;
</script>

<style>
  input {
    height: 46px;
    border-radius: 24px;
    border: 1px solid var(--line);
    padding: 0 24px 0 48px;
    outline: none;
    background-color: var(--card-bg-2);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath fill='%23606060' d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3C/svg%3E");
    background-position: 16px 50%;
    background-repeat: no-repeat;
    font-size: 16px;
    color: var(--text2);
    margin: 0;
  }

  input:focus {
    border: 2px solid var(--focus);
    margin: -1px;
  }
</style>

<input bind:value style={style} placeholder={placeholder} />
