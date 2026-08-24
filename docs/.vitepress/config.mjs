import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

// 解析 docs/public 的绝对路径（避免受 srcDir 相对基准影响）
const publicDirAbs = fileURLToPath(new URL('../public', import.meta.url))

// 站点 base；本地开发默认 '/xui/'，可用 DOCS_BASE=/ 覆盖
const SITE_BASE = process.env.DOCS_BASE ?? '/xui/'
const withBase = (p) =>
  SITE_BASE.endsWith('/') ? SITE_BASE + p.replace(/^\//, '') : SITE_BASE + p

/**
 * VitePress 用 Vue 编译器解析 Markdown。原 GitBook 时代 md 里习惯写：
 *   <link rel="stylesheet" href="../assets/xui.css">
 *   <script src="../assets/xui.js"></script>
 *   <script> document.getElementById('btn').onclick = ... </script>   ← 演示脚本
 *
 * 问题：Vue SFC 只允许一个 <script> 块。
 * 解法：
 *   1) 剥离顶部对 ../assets/*.css / *.js 的引用（xui.css/xui.js 已在 theme 全局注入）
 *   2) 提取正文中所有内联 <script>...</script>，合并成一个 <script setup>，
 *      用 onMounted + new Function 在客户端执行，保留原有 demo 行为
 *   3) 修复 ./not-found.* 占位图，避免 Rollup 解析失败
 */
function stripLegacyAssetTags() {
  const INLINE_SCRIPT_RE = /<script\b([^>]*)>([\s\S]*?)<\/script>\s*/g

  return {
    name: 'xui:legacy-md-compat',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.md')) return null
      let out = code

      // 1) 剥掉顶部指向 ../assets/*.css 的 <link>
      out = out.replace(/<link[^>]+href=["']\.\.?\/assets\/[^"']+\.css["'][^>]*>\s*/g, '')

      // 2) 剥掉 <script src="../assets/*.js"></script> 外链引用（保留内联脚本）
      out = out.replace(
        /<script[^>]+src=["']\.\.?\/assets\/[^"']+\.js["'][^>]*>\s*<\/script>\s*/g,
        ''
      )

      // 3) 提取所有剩余的内联 <script>...</script>
      const inlineScripts = []
      out = out.replace(INLINE_SCRIPT_RE, (m, attrs, body) => {
        // 只处理不带 src 的（前一步已把有 src 的处理过了，这里兜底再判一次）
        if (/\bsrc\s*=/.test(attrs)) return ''
        const trimmed = body.trim()
        if (trimmed) inlineScripts.push(trimmed)
        return ''
      })

      // 4) 修复 ./not-found.* 占位图
      out = out.replace(
        /(<img[^>]+src=["'])\.\/not-found\.[a-zA-Z0-9]+(["'][^>]*>)/g,
        '$1data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=$2'
      )

      // 4.5) md 里散落的 <style> 是 Vue SFC 全局样式（会污染整个站点），
      //      统一改成 scoped，只作用于当前页面容器。
      //      同时移除 type="text/css"（SFC 不需要）。
      out = out.replace(/<style\b([^>]*)>/g, (m, attrs) => {
        // 去掉 type="text/css" 或 type='text/css'
        let a = attrs.replace(/\s+type\s*=\s*["']text\/css["']/gi, '')
        // 已有 scoped 就不重复加
        if (!/\bscoped\b/.test(a)) a += ' scoped'
        return `<style${a}>`
      })

      // 5) 若提取到内联脚本，追加一个合法的 <script setup>，在 onMounted 里执行
      if (inlineScripts.length > 0) {
        const merged = inlineScripts.join('\n\n')
        // 用 String.raw + JSON.stringify 安全嵌入
        const payload = JSON.stringify(merged)
        const setupBlock = `

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  // 等待 xui.js 加载（theme 里注入）
  const run = () => {
    try {
      // eslint-disable-next-line no-new-func
      new Function(${payload})()
    } catch (e) {
      console.error('[xui-demo]', e)
    }
  }
  if (typeof window.xui !== 'undefined') {
    run()
  } else {
    const timer = setInterval(() => {
      if (typeof window.xui !== 'undefined') {
        clearInterval(timer)
        run()
      }
    }, 50)
    // 兜底：5s 后无论如何都执行一次
    setTimeout(() => { clearInterval(timer); run() }, 5000)
  }
})
</script>
`
        out = out + setupBlock
      }

      return out === code ? null : { code: out, map: null }
    },
  }
}

// 站点侧边栏结构（从原 SUMMARY.md 转换而来）
const sidebar = [
  {
    text: '简介',
    items: [{ text: 'xui', link: '/' }],
  },
  {
    text: '1. 样式 styles',
    collapsed: false,
    items: [
      { text: '通用 general', link: '/styles/styles' },
      { text: 'flex 布局 layout', link: '/styles/layout' },
      { text: '其他样式 others', link: '/styles/extraStyle' },
    ],
  },
  {
    text: '2. 方法 methods',
    collapsed: false,
    items: [
      { text: '方法系列 series', link: '/methods/methods' },
      { text: '节流 throttle', link: '/methods/throttle' },
      { text: '防抖 debounce', link: '/methods/debounce' },
      { text: '进制转换 digital converse', link: '/methods/digitalConverse' },
    ],
  },
  {
    text: '3. 插件 plugins',
    collapsed: true,
    items: [
      { text: '加载效果 loading', link: '/plugins/loading' },
      { text: '对话弹框 prompt', link: '/plugins/prompt' },
      { text: '提示信息 message', link: '/plugins/message' },
      { text: '图片预览 imgShow', link: '/plugins/imgShow' },
      { text: 'tab 切换 tabChange', link: '/plugins/tabChange' },
      { text: '下拉框 dropDown', link: '/plugins/dropDown' },
      { text: '倒计时 countDown', link: '/plugins/countDown' },
      { text: '日历 calendar', link: '/plugins/calendar' },
      { text: '分页 pagination', link: '/plugins/pagination' },
      { text: '幻灯片 slider', link: '/plugins/slider' },
      { text: '滚动加载 scrollLoad', link: '/plugins/scrollLoad' },
      { text: '全屏滚动 fullPage', link: '/plugins/fullPage' },
      { text: '雪花飘洒 snowFlake', link: '/plugins/snowFlake' },
      { text: '三级联动 cascader', link: '/plugins/cascader' },
      { text: '手风琴 collapse', link: '/plugins/collapse' },
      { text: '数字输入框 digital', link: '/plugins/digital' },
      { text: '滑动选择框 sliderBar', link: '/plugins/sliderBar' },
      { text: '复制剪贴板 copyToClipBoard', link: '/plugins/copyToClipBoard' },
      { text: '穿梭框 transfer', link: '/plugins/transfer' },
      { text: '懒加载 lazyLoad', link: '/plugins/lazyLoad' },
      { text: '下拉加载 pullLoad', link: '/plugins/pullLoad' },
      { text: '数字动画 digitalScroll', link: '/plugins/digitalScroll' },
      { text: '图片动画 animateImgShow', link: '/plugins/animateImgShow' },
      { text: '返回顶部 backToTop', link: '/plugins/backToTop' },
    ],
  },
  {
    text: '4. 收藏 collection',
    collapsed: true,
    items: [
      { text: '算法 algorithm', link: '/collection/algorithm' },
      { text: '日志收集 logCollection', link: '/collection/logCollection' },
      { text: '我不知道 idontknow', link: '/collection/idontknow' },
      { text: '数组 array', link: '/collection/array' },
      { text: '游戏 game', link: '/collection/games' },
      { text: '拼图 puzzle', link: '/collection/gameList/puzzle' },
      { text: '浏览器 window', link: '/collection/window' },
    ],
  },
  {
    text: '5. 日志 log',
    items: [
      { text: '更新日志（原）', link: '/others/changeLog' },
      { text: 'CHANGELOG (Keep a Changelog)', link: '/CHANGELOG' },
    ],
  },
]

export default defineConfig({
  title: 'xui',
  description: '一个基于原生 JS 的组件库文档',
  lang: 'zh-CN',
  // 部署到 https://xumengzi.github.io/xui/ 时子路径为 /xui/
  // 本地开发时若想用 '/'，可用环境变量覆盖：DOCS_BASE=/ npm run docs:dev
  base: SITE_BASE,

  // 在所有页面的 <head> 里直接引入 xui.css / xui.js
  // 用带 base 前缀的绝对路径，避免相对路径在子目录页面下解析错误
  // 目录用 xui-assets/ 避开与 VitePress 内部 assets/ 的命名冲突
  head: [
    ['link', { rel: 'stylesheet', href: withBase('xui-assets/xui.css') }],
    ['script', { src: withBase('xui-assets/xui.js'), defer: '' }],
  ],

  // 允许 README 里指向仓库文件（LICENSE 等）的相对链接
  ignoreDeadLinks: [/^\.\/LICENSE$/i, /^\.\/CHANGELOG\.md$/i],

  // 直接把仓库根目录作为文档根，避免大迁移
  srcDir: '..',
  // 显式指定绝对路径的 publicDir，指向 docs/public/
  // （srcDir 改到 '..' 后，默认相对基准会指向仓库根 public/，不存在）
  publicDir: publicDirAbs,
  outDir: '../book',
  cacheDir: '../.vitepress-cache',

  // 把 README.md 视为首页（VitePress 默认认 index.md）
  rewrites: {
    'README.md': 'index.md',
    'styles/README.md': 'styles/index.md',
    'methods/README.md': 'methods/index.md',
    'plugins/README.md': 'plugins/index.md',
    'collection/README.md': 'collection/index.md',
  },
  srcExclude: [
    'node_modules/**',
    'dist/**',
    'book/**',
    '_book/**',
    '_site/**',
    'packages/**',
    'assets/**',
    'test/**',
    'apologize/**',
    'farewell/**',
    'love/**',
    'summary/**',
    'upgrade/**',
    'resources/**',
    'img/**',
    'SUMMARY.md',
    'CODE_OF_CONDUCT.md',
    'CONTRIBUTING.md',
    'PULL_REQUEST_TEMPLATE.md',
  ],

  // Markdown 里存在原有的 <link>/<script> 到 ../assets/xui.js
  // 迁移期间保留原样，VitePress 会当作原生 HTML 直出。
  vue: {
    template: {
      compilerOptions: {
        // 兼容原有 md 中的自定义标签
        isCustomElement: (tag) => tag.startsWith('xui-'),
      },
    },
  },

  vite: {
    plugins: [stripLegacyAssetTags()],
  },

  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '更新日志', link: '/others/changeLog' },
      {
        text: '相关项目',
        items: [
          { text: 'xui-vue', link: 'https://xumengzi.github.io/xui-vue/book/index.html#/' },
          { text: 'xui-react', link: 'https://xumengzi.github.io/xui-react/build/index' },
        ],
      },
    ],
    sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/xumengzi/xui' }],
    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © xumeng',
    },
    outline: [2, 3],
    search: {
      provider: 'local',
    },
  },
})
