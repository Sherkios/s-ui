import { InputHTMLAttributes } from 'vue'

export interface ISInputProps extends /* @vue-ignore */ InputHTMLAttributes {
  color?: 'primary' | 'secondary'
  // Сигнал дла обводки ошибки
  isError?: boolean
  isWarning?: boolean
  // текст ошибки | предупреждения
  message?: string
}

export interface ISInputEmits {
  (e: 'input', value: string, event: InputEvent): void
  (e: 'blur', event: Event): void
  (e: 'focus', event: FocusEvent): void
}
