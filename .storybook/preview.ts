import { setup } from '@storybook/vue3-vite'

setup((app) => {})

export const parameters = {
  a11y: {
    // 'todo' - show a11y violations in the test UI only
    // 'error' - fail CI on a11y violations
    // 'off' - skip a11y checks entirely
    test: 'todo',
  },
}

export const decorators = [
  (story) => ({
    components: { story },
    template: `
    <div style="display:flex; justify-content: center; align-items: center; min-height: 100vh; background-color:var(--bg-color, var(--def-bg-color))">
      <story />
    </div>`,
  }),
]
