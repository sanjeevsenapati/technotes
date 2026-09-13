import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './style.css'
import TerminalHero from '../../components/TerminalHero.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h(TerminalHero)
    })
  },
  enhanceApp({ app }) {
    app.component('TerminalHero', TerminalHero)
  }
}
