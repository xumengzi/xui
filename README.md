# xui

<p align="center">
  <a href="https://www.npmjs.com/package/xui-vanilla"><img alt="npm version" src="https://img.shields.io/npm/v/xui-vanilla.svg"></a>
  <a href="https://www.npmjs.com/package/xui-vanilla"><img alt="npm downloads" src="https://img.shields.io/npm/dm/xui-vanilla.svg"></a>
  <a href="https://github.com/xumengzi/xui/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/xumengzi/xui/actions/workflows/ci.yml/badge.svg"></a>
  <a href="./LICENSE"><img alt="license" src="https://img.shields.io/npm/l/xui-vanilla.svg"></a>
</p>

> 一个基于**原生 JS** 的组件库，提供丰富的方法、组件与插件。不依赖任何框架，可在 Vue / React / Angular 等任何工程中使用。

- 📦 **零框架依赖**，产物 <30 KB（gzip 6.7 KB）
- 🧩 **按需引入**（ESM tree-shaking）或**整体引入**（UMD 一行 `<script>` 搞定）
- 🎨 内置样式、常用方法、20+ 常用组件
- 📖 完整文档站点（VitePress 驱动）

## 📥 安装

```bash
npm install xui-vanilla
# or
pnpm add xui-vanilla
# or
yarn add xui-vanilla
```

## 🚀 快速开始

### 按需引入（推荐，支持 tree-shaking）

```js
import { loading, dropDown, pagination } from 'xui-vanilla'
import 'xui-vanilla/style' // 组件样式

loading.loading(true, null, '加载中...')
setTimeout(() => loading.loading(false), 2000)
```

### 整体引入（`<script>` 直接用）

```html
<link rel="stylesheet" href="https://unpkg.com/xui-vanilla/dist/xui.css">
<script src="https://unpkg.com/xui-vanilla/dist/xui.umd.cjs"></script>
<script>
  // 全局对象 xui
  xui.loading.loading(true)
</script>
```

## 🧩 组件矩阵

| 分类 | 组件 |
|---|---|
| **反馈** | loading · prompt · message · popConfirm |
| **数据展示** | pagination · slider · imgShow · animateImgShow · digitalScroll |
| **数据录入** | dropDown · calendar · digital · sliderBar · cascader · transfer |
| **导航** | tabChange · backToTop · fullPage |
| **其他** | collapse · countDown · lazyLoad · pullLoad · scrollLoad · snowFlake · copyToClipBoard |

完整文档：<https://xumengzi.github.io/xui/>

## 🛠 本地开发

```bash
# 安装依赖
npm install

# 组件库开发/构建
npm run build          # 输出到 dist/
npm run lint           # 代码检查
npm run lint:fix       # 自动修复

# 文档站点
npm run docs:dev       # http://localhost:5173/
npm run docs:build     # 构建到 book/
npm run docs:preview   # 预览构建产物
```

## 📁 目录结构

```
xui/
├── packages/         组件源码（按需引入的入口）
├── assets/           整合版 xui.js / xui.css（自动生成）
├── docs/             VitePress 文档站点配置
├── dist/             构建产物（npm 发布内容）
├── methods/          方法文档
├── plugins/          组件文档
├── styles/           样式文档
└── collection/       实用代码收藏
```

## 🌐 兼容性

- 现代浏览器（Chrome / Edge / Safari / Firefox 最新版）
- IE 10+ 需要业务侧用 Babel 转译

## 📝 更新日志

见 [CHANGELOG.md](./CHANGELOG.md)。

## 🤝 贡献

欢迎 issue 与 PR，也可邮件联系：`xumeng0611@gmail.com`

## 📄 License

[MIT](./LICENSE)

---

<sub>逢中国历史上一些大灾难, 本站点会置灰</sub>

<sub>
寓形宇内复几时，曷不委心任去留？<br/>
胡为乎遑遑欲何之？<br/>
富贵非吾愿，帝乡不可期。<br/>
怀良辰以孤往，或植杖而耘耔。<br/>
登东皋以舒啸，临清流而赋诗。<br/>
聊乘化以归尽，乐夫天命复奚疑！<br/>
——节选自陶渊明《归去来兮辞》
</sub>
