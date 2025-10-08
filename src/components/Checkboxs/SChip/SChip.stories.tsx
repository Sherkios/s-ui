import SChip from '@/components/Checkboxs/SChip/SChip.vue'
import threeColorsDecorator from '@/decorators/three-colors'
const meta = {
  component: SChip,
  decorators: [threeColorsDecorator],
} satisfies Meta<typeof SChip>

export default meta

type Story = StoryObj<typeof SChip>

export const Default: Story = {
  render: (args) => ({
    components: { SChip },
    setup() {
      return { args }
    },
    template: '<SChip v-bind="args" class="test" style="width:100px" disabled > test </SChip>',
  }),
}
