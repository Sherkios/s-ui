const threeColorsDecorator = (story) => ({
  components: { story },
  template: `
    <div style="display: flex; width: 100%;">
    <div style="display:flex; justify-content: center; align-items: center; min-height: 100vh; background-color:var(--bg-light-color, var(--def-bg-light-color)); flex: 1 1 0">
      <story />
    </div>

    <div style="display:flex; justify-content: center; align-items: center; min-height: 100vh; background-color:var(--bg-color, var(--def-bg-color)); flex: 1 1 0">
      <story />
    </div>



    <div style="display:flex; justify-content: center; align-items: center; min-height: 100vh; background-color:var(--bg-dark-color, var(--def-bg-dark-color)); flex: 1 1 0">
      <story />
    </div>
    </div>
    `,
})

export default threeColorsDecorator
