import SButton from '@/components/Buttons/SButton/SButton.vue'
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
    template: '<SButton v-bind="args">Button</SButton>',
  }),
  args: {
    disabled: true,
  },
}

export const Large: Story = {
  render: (args) => ({
    components: { SButton },
    setup: () => ({ args }),
    template: '<SButton v-bind="args">Button</SButton>',
  }),
  args: {
    size: 'large',
  },
}

export const Small: Story = {
  render: (args) => ({
    components: { SButton },
    setup: () => ({ args }),
    template: '<SButton v-bind="args">Button</SButton>',
  }),
  args: {
    size: 'small',
  },
}

export const Primary: Story = {
  render: (args) => ({
    components: { SButton },
    setup: () => ({ args }),
    template: '<SButton v-bind="args">Button</SButton>',
  }),
  args: {
    color: 'primary',
    disabled: false,
  },
}

export const Secondary: Story = {
  render: (args) => ({
    components: { SButton },
    setup: () => ({ args }),
    template: '<SButton v-bind="args">Button</SButton>',
  }),
  args: {
    color: 'secondary',
    disabled: false,
  },
}

export const Danger: Story = {
  render: (args) => ({
    components: { SButton },
    setup: () => ({ args }),
    template: '<SButton v-bind="args">Button</SButton>',
  }),
  args: {
    color: 'danger',
    disabled: false,
  },
}

export const Success: Story = {
  render: (args) => ({
    components: { SButton },
    setup: () => ({ args }),
    template: '<SButton v-bind="args">Button</SButton>',
  }),
  args: {
    color: 'success',
    disabled: false,
  },
}

export const WithSides: Story = {
  render: (args) => ({
    components: { SButton },
    setup: () => ({ args }),
    template: `
    <SButton v-bind="args">
      <template #left>
        <svg viewBox="-19.04 0 75.803 75.803" style="width: 1.6rem; heght: 1.6rem" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Group_64" data-name="Group 64" transform="translate(-624.082 -383.588)"> <path id="Path_56" data-name="Path 56" d="M660.313,383.588a1.5,1.5,0,0,1,1.06,2.561l-33.556,33.56a2.528,2.528,0,0,0,0,3.564l33.556,33.558a1.5,1.5,0,0,1-2.121,2.121L625.7,425.394a5.527,5.527,0,0,1,0-7.807l33.556-33.559A1.5,1.5,0,0,1,660.313,383.588Z" fill="currentColor"></path> </g> </g></svg>
      </template>

      <template #default>
        Button
      </template>

      <template #right>
        <svg viewBox="-19.04 0 75.804 75.804" style="width: 1.6rem; heght: 1.6rem" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="currentColor"></path> </g> </g></svg>
      </template>
    </SButton>`,
  }),
}
