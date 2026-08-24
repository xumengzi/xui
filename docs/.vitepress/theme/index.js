// VitePress 主题增强
// xui.css / xui.js 已通过 config.mjs 的 head 字段全局引入，
// 这里只处理站点级副作用（哀悼日置灰）。

import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp() {
    if (typeof window === 'undefined') return

    // 站点级副作用：哀悼日置灰
    const mourningDates = ['4.4', '5.12', '12.13']
    const d = new Date()
    const key = `${d.getMonth() + 1}.${d.getDate()}`
    if (mourningDates.includes(key)) {
      document.documentElement.style.filter = 'grayscale(1)'
    }
  },
}
