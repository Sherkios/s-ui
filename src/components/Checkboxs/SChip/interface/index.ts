import { HTMLAttributes, InputHTMLAttributes } from 'vue'

export interface IChipProps<T = any> {
  name: string
  type?: 'checkbox' | 'radio'
  isError?: boolean
  accept?: string
  alt?: string
  autocomplete?: string
  autofocus?: boolean
  capture?: boolean | 'user' | 'environment'
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
  placeholder?: string
  readonly?: boolean
  required?: boolean
}

export interface IChipEmits {
  (e: 'change', value: boolean): void
}
