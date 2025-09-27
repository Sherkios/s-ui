<template>
  <!-- Класс навешиваем корню компонента -->
  <label class="s-input" :class="[$attrs.class, labelClass]">
    <p v-if="$slots['title']" class="s-input__title">
      <slot name="title" />
    </p>

    <div class="s-input__wrapper">
      <!-- Назначаем все переданные атрибуты в инпут кроме класса -->
      <input
        ref="input"
        v-bind="props"
        v-model="model"
        class="s-input__input"
        :class="undefined"
        @input="(event) => handleInput()"
        @blur="handleBlur"
      />

      <Transition name="fade">
        <p v-if="message && isShowMessage" class="s-input__message" :class="messageClass">
          {{ message }}
        </p>
      </Transition>
    </div>
  </label>
</template>

<script setup lang="ts">
import { ISInputEmits, ISInputProps } from '@/components/Inputs/SInput/interface'
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'

defineOptions({
  name: 'SInput',
  // Отключаем наследование атрибутов
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ISInputProps>(), {
  color: 'primary',
})

const emits = defineEmits<ISInputEmits>()

const input = useTemplateRef<HTMLInputElement | null>('input')
const model = defineModel<string>({
  default: '',
})

// Состояние сообщения
// Необходимо для сохранения класса при вводе новых соимволов
const messageStatus = ref<'error' | 'warning'>('error')

// Флаг состояния
// true - при появление ошибки
// сбрасывается при вводе новых символов
const isAttention = ref<boolean>(Boolean(props.isError || props.isWarning))

// Флаг состояния необходимости показывания сообщения
const isShowMessage = ref<boolean>(Boolean(props.message))

const labelClass = computed(() => [
  {
    's-input_error': props.isError && isAttention.value,
    's-input_warning': props.isWarning && isAttention.value,
  },
])

const messageClass = computed(() => [
  {
    's-input__message_error': messageStatus.value === 'error',
    's-input__message_warning': messageStatus.value === 'warning',
  },
])

/**
 * Обрабатывает ввод символов
 * @param value
 */
const handleInput = async (event: Event): Promise<void> => {
  isAttention.value = false

  // Дожидаемся изменеий в html
  await nextTick()

  emits('input', model.value, event as InputEvent)
}

const handleBlur = (): void => {
  if (!isAttention.value) isShowMessage.value = false
}

// Отслеживаем изменения состояния и меняем состояние сообщения для изменения стилей
watch(
  () => [props.isError, props.isWarning],
  ([isError, isWarning]) => {
    // меняем статус сообщения по соотвутсвующему флагу
    if (isError) {
      messageStatus.value = 'error'
    } else if (isWarning) {
      messageStatus.value = 'warning'
    }

    // Выставляем флаг при наличии ошибки
    if (isError || isWarning) {
      isAttention.value = true
      isShowMessage.value = true
    } else {
      isAttention.value = false
    }
  },
)

watch(
  () => props.message,
  () => {
    if (props.message) {
      isShowMessage.value = true
    }
  },
)
</script>

<style lang="scss">
.s-input {
  display: flex;
  flex-direction: column;

  gap: 1.2rem;

  &__title {
    color: var(--def-text-muted-color);
    font-size: var(--font-size, var(--def-font-size));

    transition: all 0.2s ease;
  }

  &__wrapper {
    position: relative;

    padding-bottom: var(--input-message-font-size);
  }

  &__input {
    appearance: none;
    outline: none;

    padding: 0.6rem 1rem;

    border: 0.2rem solid var(--input-border-color);
    border-radius: var(--border-radius, var(--def-border-radius));

    background-color: var(--input-background-color);
    color: var(--input-color);

    font-size: var(--input-font-size);

    transition: all 0.2s ease;

    &:hover,
    &:focus {
      background-color: var(--input-background-color-hover);
    }

    &:focus {
      border: 0.2rem solid var(--primary-color, var(--def-primary-color));
    }
  }

  &__message {
    top: calc(100% - var(--input-message-font-size));
    position: absolute;
    font-size: var(--input-message-font-size);

    &_error {
      color: var(--danger-color, var(--def-danger-color));
    }

    &_warning {
      color: var(--warning-color, var(--def-warning-color));
    }
  }

  &_error {
    .s-input__title {
      color: var(--danger-color, var(--def-danger-color));
    }

    .s-input__input {
      border: 0.2rem solid var(--danger-color, var(--def-danger-color));
    }
  }

  &_warning {
    .s-input__title {
      color: var(--warning-color, var(--def-warning-color));
    }

    .s-input__input {
      border: 0.2rem solid var(--warning-color, var(--def-warning-color));
    }
  }
}
</style>
