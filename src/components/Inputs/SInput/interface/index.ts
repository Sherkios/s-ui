import { InputHTMLAttributes } from 'vue'

export interface ISInputProps extends /* @vue-ignore */ Omit<InputHTMLAttributes, 'type'> {
  color?: 'primary' | 'secondary'
  // Сигнал дла обводки ошибки
  isError?: boolean
  isWarning?: boolean
  // текст ошибки | предупреждения
  message?: string
  type?: 'text' | 'password' | 'email' | 'tel' | 'url' | 'number'
}

export interface ISInputEmits {
  (e: 'input', value: string, event: InputEvent): void
  (e: 'change', value: string): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
  (e: 'keydown:enter', event: KeyboardEvent): void
  (e: 'keydown:up', value: string, event: KeyboardEvent): void
  (e: 'keydown:down', value: string, event: KeyboardEvent): void
}
