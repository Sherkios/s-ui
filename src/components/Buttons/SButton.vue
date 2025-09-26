<template>
  <button class="s-button">
    <slot name="left-icon"></slot>

    <slot></slot>

    <slot name="right-icon"></slot>
  </button>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SButton',
})
</script>

<style lang="scss">
.s-button {
  padding: 0.8rem 1.6rem;

  border: 0.1rem solid var(--button-border-color);
  border-radius: var(--button-border-radiues);

  background-color: var(--button-background-color);
  color: var(--button-color);

  font-size: var(--button-font-size);
  box-shadow: 0 0 0 var(--button-border-color);

  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: var(--button-background-color-hover);
  }

  &:active {
    box-shadow: 0 0 0.8rem var(--button-border-color);
  }
}
</style>
