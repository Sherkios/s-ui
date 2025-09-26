import SButton from '@/components/Buttons/SButton.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import threeColorsDecorator from '@/decorators/three-colors'
const meta = {
  component: SButton,
  decorators: [threeColorsDecorator],
} satisfies Meta<typeof SButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { SButton },
    setup: () => ({ args }),
    template: '<SButton>Button</SButton>',
  }),
  args: {},
}

export const Disabled: story = {
  render: (args) => ({
    components: { SButton },
    setup: () => ({ args }),
    template: '<SButton disabled>Button</SButton>',
  }),
  args: {},
}

export const Large: Story = {
  render: (args) => ({
    components: { SButton },
    setup: () => ({ args }),
    template: '<SButton size="large">Button</SButton>',
  }),
  args: {},
}

export const Small: Story = {
  render: (args) => ({
    components: { SButton },
    setup: () => ({ args }),
    template: '<SButton size="small">Button</SButton>',
  }),
  args: {},
}
