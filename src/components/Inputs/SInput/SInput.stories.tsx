import SInput from '@/components/Inputs/SInput/SInput.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import threeColorsDecorator from '@/decorators/three-colors'

const meta = {
  component: SInput,
  decorators: [threeColorsDecorator],
  args: {
    isError: false,
    isWarning: false,
    message: '',
  },
} satisfies Meta<typeof SInput>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args) => ({
    components: { SInput },
    setup: () => ({ args }),
    template: '<SInput v-bind="args" />',
  }),
  args: {},
}

export const WithError: Story = {
  render: (args) => ({
    components: { SInput },
    setup: () => ({ args }),
    template: `<SInput v-bind="args" >
      <template #title>
        With Error
      </template>
    </SInput>`,
  }),
  args: {
    message: 'error message',
  },
}
