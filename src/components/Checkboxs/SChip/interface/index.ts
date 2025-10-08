import { HTMLAttributes, InputHTMLAttributes } from 'vue'

export type TOnlyChipAttr = Omit<Omit<InputHTMLAttributes, keyof HTMLAttributes>, 'type'>
export type TParentChipAttr = Omit<HTMLAttributes, keyof TOnlyChipAttr>

export interface IChipProps extends /* @vue-ignore */ Omit<InputHTMLAttributes, 'type'> {
  type?: 'checkbox' | 'radio'
  isError?: boolean
}

export interface IChipEmits {
  (e: 'change', value: boolean): void
}
