import { ButtonHTMLAttributes } from 'vue'

export interface ISButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
  size?: 'small' | 'medium' | 'large'
  color?: 'default' | 'primary' | 'secondary' | 'danger' | 'success'
}
