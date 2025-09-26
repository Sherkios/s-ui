import { ButtonHTMLAttributes } from 'vue'

export interface ISButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
  size?: 'small' | 'medium' | 'large'
}
