<template>
  <button class="s-button" :class="buttonClass">
    <span v-if="$slots['left']" class="s-button__left">
      <slot name="left"></slot>
    </span>

    <slot></slot>

    <span v-if="$slots['right']" class="s-button__right">
      <slot name="right"></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { ISButtonProps } from '@/components/Buttons/SButton/interface'
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
    's-button_primary': props.color === 'primary',
    's-button_default': props.color === 'default',
    's-button_danger': props.color === 'danger',
    's-button_success': props.color === 'success',
    's-button_secondary': props.color === 'secondary',
  },
])
</script>

<style lang="scss">
.s-button {
  position: relative;
  padding: 0.8rem 1.6rem;

  display: flex;
  gap: 0.8rem;

  border: 0.1rem solid var(--button-border-color);
  border-radius: var(--button-border-radiues);

  background-color: var(--button-background-color);
  color: var(--button-color);

  font-size: var(--button-font-size);
  line-height: 100%;

  transition: all 0.2s ease;
  cursor: pointer;

  &:active,
  &:hover {
    background-color: var(--button-background-color-hover);
  }

  &:active {
    transform: scale(0.96);
  }

  &:disabled {
    opacity: 0.5;

    background-color: var(--button-background-color);
    box-shadow: 0 0 0 var(--button-box-shadow-color);

    cursor: not-allowed;
  }

  &_small {
    padding: 0.8rem 1.6rem;

    font-size: var(--button-font-size-small);

    &:active {
      box-shadow: 0 0 0.4rem var(--button-box-shadow-color);
    }
  }

  &_medium {
    padding: 1.2rem 2.4rem;

    &:active {
      box-shadow: 0 0 0.8rem var(--button-box-shadow-color);
    }
  }

  &_large {
    padding: 1.6rem 3.2rem;

    font-size: var(--button-font-size-large);

    &:active {
      box-shadow: 0 0 1.2rem var(--button-box-shadow-color);
    }
  }

  // Общие стили для цветовых кнопок
  &_danger,
  &_success,
  &_primary,
  &_secondary {
    color: var(--def-bg-light-color);
    border: 1px solid transparent;
  }

  &_primary {
    background-color: var(--button-background-color-primary);

    &:active,
    &:hover {
      background-color: var(--button-background-color-primary-hover);
    }

    &:disabled {
      background-color: var(--button-background-color-primary);
    }
  }

  &_danger {
    background-color: var(--button-background-color-danger);

    &:active,
    &:hover {
      background-color: var(--button-background-color-danger-hover);
    }

    &:active {
      --button-box-shadow-color: var(--danger-color, var(--def-danger-color));
    }

    &:disabled {
      background-color: var(--button-background-color-danger);
    }
  }

  &_success {
    background-color: var(--button-background-color-success);

    --button-box-shadow-color: var(--success-color, var(--def-success-color));
    &:active,
    &:hover {
      background-color: var(--button-background-color-success-hover);
    }

    &:disabled {
      background-color: var(--button-background-color-success);
    }
  }

  &_secondary {
    background-color: var(--button-background-color-secondary);

    --button-box-shadow-color: var(--secondary-color, var(--def-secondary-color));
    &:active,
    &:hover {
      background-color: var(--button-background-color-secondary-hover);
    }

    &:disabled {
      background-color: var(--button-background-color-secondary);
    }
  }

  &__left {
    display: flex;
    justify-content: center;
  }

  &__right {
    display: flex;
    justify-content: center;
  }
}
</style>
