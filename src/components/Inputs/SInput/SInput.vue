<template>
  <!-- Класс навешиваем корню компонента -->
  <label class="s-input" :class="labelClass">
    <p v-if="$slots['title']" class="s-input__title">
      <slot name="title" />
    </p>

    <div class="s-input__wrapper">
      <!-- Назначаем все переданные атрибуты в инпут кроме класса -->
      <input
        v-bind="props"
        ref="input"
        v-model="model"
        class="s-input__input"
        :type="typeInput"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @keydown.enter="handleKeydownEnter"
        @keydown.up="handleKeydownUp"
        @keydown.down="handleKeydownDown"
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
import { computed, InputHTMLAttributes, nextTick, ref, useAttrs, useTemplateRef, watch } from 'vue'

defineOptions({
  name: 'SInput',
  // Отключаем наследование атрибутов
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ISInputProps>(), {
  color: 'primary',
  type: 'text',
})

const attrs: InputHTMLAttributes = useAttrs()

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

const typeInput = computed(() => {
  if (props.type === 'number') {
    return 'text'
  }

  return props.type
})

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
 * Вызывает emit при изменение значения
 */
const handleChange = (): void => {
  emits('change', model.value)
}

/**
 * Обрабатывает ввод символов
 * @param value
 */
const handleInput = async (event: Event): Promise<void> => {
  if (props.type === 'number') validateNumberInput(event)

  isAttention.value = false

  // Дожидаемся изменеий в html
  await nextTick()

  emits('input', model.value, event as InputEvent)
  handleChange()
}

const handleFocus = (event: FocusEvent): void => {
  emits('focus', event)
}

/**
 * Обрабатывает событие потери фокуса
 */
const handleBlur = (event: FocusEvent): void => {
  if (!isAttention.value) isShowMessage.value = false

  emits('blur', event)
}

/**
 * Обрабатывает событие нажатия кнопки Enter при фокусировки на инпуте
 * @param event
 */
const handleKeydownEnter = (event: KeyboardEvent): void => {
  emits('keydown:enter', event)
}

/**
 * Обрабатывает нажатие на стрелку вверх
 * @param event
 */
const handleKeydownUp = async (event: KeyboardEvent): Promise<void> => {
  // если не число, то пропускаем
  if (props.type !== 'number') return
  event.preventDefault()

  // Получаем значение
  const target = event.target as HTMLInputElement
  const value = target.value

  // получаем число из строки
  const number = Number(value)

  // Получаем число в рамках ограничений
  const newNumberValue = validateMinMax(number + 1)

  target.value = String(newNumberValue)

  model.value = target.value

  await nextTick(() => {
    setApostropheEnd()
  })

  emits('keydown:up', model.value, event)
  handleChange()
}

/**
 * Обрабатывает нажатие на стрелку вниз
 * @param event
 */
const handleKeydownDown = async (event: KeyboardEvent): Promise<void> => {
  // если не число, то пропускаем
  if (props.type !== 'number') return
  // Получаем значение
  const target = event.target as HTMLInputElement
  const value = target.value

  // получаем число из строки
  const number = Number(value)

  // Получаем число в рамках ограничений
  const newNumberValue = validateMinMax(number - 1)

  target.value = String(newNumberValue)
  model.value = target.value

  await nextTick()
  emits('keydown:down', model.value, event)
  handleChange()
}

/**
 * Валидирует ввод числового значения в input
 * @param event
 */
const validateNumberInput = (event: Event): void => {
  const target = event.target as HTMLInputElement
  const value = target.value

  target.value = value
    // Отсекаем все символы не являющиеся числом, "-" и "."
    .replace(/[^\d.-]/g, '')
    // Проверяем "-"" стоит первым или нет, если нет то убираем
    .replace(/(?!^)-/g, '')
    // Находим "." и любой сиволм после нее, находим дополнительную точку и убираем ее если есть
    .replace(/(\..*?)\./g, '$1')

  target.value = String(validateMinMax(target.value))
  model.value = target.value
}

/**
 * Возвращает значение в диапозаное заданных ограничений min, max
 * @param value
 */
const validateMinMax = (value: string | number): number => {
  let number = 0
  if (typeof value === 'string') {
    number = Number(value)
  } else {
    number = value
  }

  return Math.min(
    Math.max(number, attrs?.min ? +attrs.min : -Infinity),
    attrs?.max ? +attrs.max : Infinity,
  )
}

/**
 * Устанавливает курсор в конец строки
 */
const setApostropheEnd = async (): Promise<void> => {
  if (input.value) {
    input.value.focus()
    input.value.setSelectionRange(input.value.value.length + 1, input.value.value.length)
  }
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

defineExpose({
  input,
})
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
      --input-border-color: var(--primary-color, var(--def-primary-color));
    }
  }

  &__message {
    top: 100%;
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
      --input-border-color: var(--danger-color, var(--def-danger-color));
    }
  }

  &_warning {
    .s-input__title {
      color: var(--warning-color, var(--def-warning-color));
    }

    .s-input__input {
      --input-border-color: var(--warning-color, var(--def-warning-color));
    }
  }
}
</style>
