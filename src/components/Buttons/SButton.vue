<template>
  <button class="s-button" :class="buttonClass">
    <slot name="left-icon"></slot>

    <slot></slot>

    <slot name="right-icon"></slot>
  </button>
</template>

<script setup lang="ts">
import { ISButtonProps } from '@/components/Buttons/interface'
import { computed } from 'vue'

defineOptions({
  name: 'SButton',
})

const props = withDefaults(defineProps<ISButtonProps>(), {
  size: 'medium',
})

const buttonClass = computed(() => [
  {
    's-button_small': props.size === 'small',
    's-button_medium': props.size === 'medium',
    's-button_large': props.size === 'large',
  },
])
</script>

<style lang="scss">
.s-button {
  position: relative;
  padding: 0.8rem 1.6rem;

  border: 0.1rem solid var(--button-border-color);
  border-radius: var(--button-border-radiues);

  background-color: var(--button-background-color);
  color: var(--button-color);

  font-size: var(--button-font-size);
  box-shadow: 0 0 0 var(--button-border-color);

  transition: all 0.2s ease;
  cursor: pointer;

  &:active,
  &:hover {
    background-color: var(--button-background-color-hover);
  }

  &:active {
    box-shadow: 0 0 0.8rem var(--button-border-color);
  }

  &:disabled {
    opacity: 0.5;

    background-color: var(--button-background-color-disabled);
    box-shadow: 0 0 0 var(--button-border-color);

    cursor: not-allowed;
  }

  &_small {
    padding: 0.6rem 1.2rem;

    font-size: var(--button-font-size-small);

    &:active {
      box-shadow: 0 0 0.4rem var(--button-border-color);
    }
  }

  &_medium {
    padding: 0.8rem 1.6rem;
  }

  &_large {
    padding: 1.2rem 2.4rem;

    font-size: var(--button-font-size-large);
  }
}
</style>
