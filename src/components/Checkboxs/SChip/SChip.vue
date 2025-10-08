<template>
  <label class="chip" :class="chipClass">
    <slot></slot>
    <input v-model="model" v-bind="props" class="chip__input" :type />
  </label>
</template>

<script setup lang="ts">
import { IChipProps } from '@/components/Checkboxs/SChip/interface'
import { computed } from 'vue'

defineOptions({
  name: 'SChip',
})

const props = withDefaults(defineProps<IChipProps>(), {
  type: 'checkbox',
  disabled: false,
})

const chipClass = computed(() => [
  {
    chip_error: props.isError,
  },
])

const model = defineModel<boolean>()
</script>

<style lang="scss">
.chip {
  position: relative;

  display: flex;
  justify-content: center;

  padding: 0.8rem 1.6rem;

  background-color: var(--chip-background-color);

  border: 0.1rem solid var(--chip-border-color);
  border-radius: 1.2rem;
  box-shadow: 0 0 0rem var(--chip-border-color);

  color: var(--chip-color);

  font-size: var(--chip-font-size);

  transition: all 0.2s ease;

  cursor: pointer;

  &__input {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  }

  &:hover {
    --chip-background-color: var(--chip-background-color-hover);
  }

  &:has(&__input:checked) {
    --chip-color: var(--primary-color, var(--def-primary-color));
    --chip-background-color: var(--bg-light-color, var(--def-bg-light-color));
  }

  &_error {
    --chip-color: var(--danger-color, var(--def-danger-color));
    --chip-border-color: var(--danger-color, var(--def-danger-color));
  }
  &:has(&__input:active) {
    box-shadow: 0 0 0.4rem var(--chip-border-color);
  }

  &:has(&__input:disabled) {
    --chip-background-color: var(--bg-color, var(--def-bg-color));
    --chip-border-color: var(--border-color, var(--def-border-color));
    --chip-color: var(--text-color, var(--def-text-color));
    box-shadow: none;
    opacity: 0.5;
  }
}
</style>
