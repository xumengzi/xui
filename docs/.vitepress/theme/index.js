// VitePress 全局主题增强：注入原有的 xui.css / xui.js，以及文档站点副作用
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    if (typeof window === 'undefined') return

    // 站点 base（如 '/xui/' 或 '/'）
    const base = siteData?.value?.base ?? '/'
    const withBase = (p) => (base.endsWith('/') ? base + p.replace(/^\//, '') : base + p)

    // 1) 引入组件库样式
    if (!document.getElementById('xui-css')) {
      const link = document.createElement('link')
      link.id = 'xui-css'
      link.rel = 'stylesheet'
      link.href = withBase('assets/xui.css')
      document.head.appendChild(link)
    }

    // 2) 引入组件库脚本
    if (!document.getElementById('xui-js')) {
      const script = document.createElement('script')
      script.id = 'xui-js'
      script.src = withBase('assets/xui.js')
      script.defer = true
      document.head.appendChild(script)
    }

    // 3) 文档站点副作用（哀悼日置灰等），源自原 assets/site.js
    const mourningDates = ['4.4', '5.12', '12.13']
    const d = new Date()
    const key = `${d.getMonth() + 1}.${d.getDate()}`
    if (mourningDates.includes(key)) {
      document.documentElement.style.filter = 'grayscale(1)'
    }
  },
}
