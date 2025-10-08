import { InputHTMLAttributes } from 'vue'

export interface ISInputProps<T = any> {
  color?: 'primary' | 'secondary'
  // Сигнал дла обводки ошибки
  isError?: boolean
  isWarning?: boolean
  // текст ошибки | предупреждения
  message?: string
  type?: 'text' | 'password' | 'email' | 'tel' | 'url' | 'number'
  accept?: string
  alt?: string
  autocomplete?: string
  autofocus?: boolean
  capture?: boolean | 'user' | 'environment'
  checked?: boolean | T[] | Set<T>
  crossorigin?: string
  disabled?: boolean
  enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'
  form?: string
  formaction?: string
  formenctype?: string
  formmethod?: string
  formnovalidate?: boolean
  formtarget?: string
  indeterminate?: boolean
  list?: string
  max?: number
  maxlength?: number
  min?: number
  minlength?: number
  multiple?: boolean
  name?: string
  pattern?: string
  placeholder?: string
  readonly?: boolean
  required?: boolean
  size?: number
  src?: string
  step?: number
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
