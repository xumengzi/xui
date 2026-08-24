# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **工程化改造**：引入 `package.json` + Vite 构建，产出 ESM / UMD / CSS 双入口，支持 tree-shaking
- **文档站点**：从已 EOL 的 GitBook CLI 迁移到 VitePress
- **CI/CD**：新增 GitHub Actions workflow，自动跑 lint/build，并部署文档到 GitHub Pages
- **配置对齐**：ESLint 与 Prettier 规则统一（2 空格 / 单引号 / 无尾分号）
- **`.gitignore` / `.npmignore` 分工明确**：git 只忽略真正不入库的产物，npm 发布白名单由 `package.json` 的 `files` 字段控制

### Removed

- 从 `assets/xui.js` 剥离 Google Tag Manager、哀悼日置灰、自动水印实例化等副作用（改由文档站点脚本 `assets/site.js` / VitePress theme 引入）
- 移除 `build.sh` / `serve.sh` / `book.json`（GitBook 时代产物）

## [3.3.16] - 2023-07-26

### Improved

- `animateImgShow` 图片放大动画支持任意数量配置

## [3.2.16] - 2023-05-15

### Added

- 与君离别, 江湖再见
- 删除页面 tag 版本表示

## [3.2.15] - 2020-12-11

### Added

- 与君离别, 江湖再见

## [3.1.15] - 2020-11-27

### Added

- 增加开发、部署 shell 命令

## [3.0.14] - 2020-11-13

### Fixed

- 修复单选框鼠标状态 `not-allowed` → `pointer`

## [3.0.13] - 2020-10-30

### Improved

- 完善 `.gitignore` 文件
- 常用方法增加 `xui.js` 的图片描述

## [3.0.12] - 2020-08-30

### Improved

- 优化自定义 `promise.js`

## [3.0.11] - 2020-08-20

### Fixed

- 修复深拷贝 `objCopy` 函数的传值问题
  ```js
  xui.objCopy(obj)       // 浅拷贝
  xui.objCopy(obj, true) // 深拷贝
  ```

## [3.0.10] - 2020-07-19

### Fixed

- 修复 tab 切换的 bug

## [3.0.9] - 2020-06-29

### Improved

- 调整 `xui.js` 里防抖、节流函数的参数名

## [3.0.8] - 2020-06-09

### Improved

- 格式化 CSS 与 JS

## [3.0.7] - 2020-04-29

### Added

- 项目添加水印

## [3.0.6] - 2020-04-12

### Fixed

- 修复 `backToTop` 设置目标元素不滚动的 bug
- 组件其它样式优化与动画补充

## [3.0.5] - 2020-04-06

### Added

- 新增 `backToTop` 返回顶部插件

## [2.9.5] - 2020-04-04

### Added

- 新增哀悼纪念日，逢中国历史上一些大灾难，本站点会置灰

## [2.9.4] - 2020-02-24

### Added

- 新增 `animateImgShow` 图片放大动画插件

## [2.8.4] - 2019-12-31

### Added

- 新增音乐播放器示例

## [2.8.3] - 2019-10-16

### Improved

- 代码块增加复制按钮

## [2.8.2] - 2019-09-29

### Added

- 增加 window 对象描述

## [2.7.2] - 2019-08-24

### Fixed

- 修复 `fullPage` 全屏滚动插件鼠标处在特定位置才能滚动的 bug

### Improved

- 格式化 `assets` 目录代码风格

## [2.7.1] - 2019-07-14

### Added

- 增加趣味游戏收藏

## [2.6.1] - 2019-07-01

### Improved

- 日志描述信息调整

## [2.6.0] - 2019-06-19

### Added

- 新增 `digitalScroll` 数字滚动动画插件

## [2.5.0] - 2019-05-13

### Added

- 新增格式化金钱的方法 `xui.formatNumber`

## [2.4.9] - 2019-04-21

### Added

- `packages/` 里增加气泡确认框 (`popConfirm`) 插件

## [2.4.8] - 2019-04-07

### Improved

- `calendar` 增加参数、回调，实例上增加 `getCurrentDate` / `setCurrentDate`
- `dropDown` 增加参数、回调，实例上增加 `getCurrentValue`

## [2.4.7] - 2019-04-06

### Improved

- `sliderBar` 增加参数、回调，实例上增加 `getCurrentValue` / `setCurrentValue`

## [2.4.6] - 2019-03-24

### Added

- 组件细分，支持单个 `import`，源码在 `packages/`（ES6 + SCSS）

## [2.3.6] - 2019-03-12

### Improved

- 完善日志收集插件，增加 DNS 解析、JS 内存、请求资源等耗时

## [2.3.5] - 2019-03-10

### Added

- 新增数组高级函数收藏（map、find、reduce）

## [2.2.5] - 2019-03-09

### Added

- 新增 "我不知道" 收藏，记录日常碰到的前端知识

## [2.2.4] - 2019-03-02

### Improved

- 完善日志收集插件，增加错误种类

## [2.2.3] - 2019-02-23

### Added

- 新增日志收集插件

## [2.1.3] - 2019-01-12

### Improved

- 图片预览插件增加跨域下的下载说明

## [2.1.2] - 2019-01-05

### Fixed

- 完善 xui 框架（license、issue 模板）
- 修复懒加载 error / loading 图不展示的问题

## [2.1.1] - 2018-12-31

### Added

- 增加 Vue 版框架 `xui-vue`

## [2.1.0] - 2018-12-09

### Improved

- 完善倒计时组件

## [2.0.9] - 2018-12-01

### Added

- 新增收藏章节 `collection`

## [2.0.8] - 2018-11-30

### Added

- 新增进制转换方法

## [2.0.7] - 2018-11-10

### Fixed

- 删除 md 文件里冗余代码

## [2.0.6] - 2018-10-28

### Added

- 新增防抖函数 `debounce`

## [2.0.5] - 2018-10-27

### Added

- 新增节流函数 `throttle`

## [2.0.4] - 2018-10-19

### Fixed

- xui 框架指向新域名

## [2.0.3] - 2018-09-01

### Improved

- 重新整理插件序号

## [2.0.2] - 2018-08-12

### Added

- 下拉加载插件 `pullLoad`

## [1.9.2] - 2018-07-04

### Fixed

- 修复 `sliderBar` 拖动时会选中默认文字的问题

## [1.9.1] - 2018-06-22

### Added

- 懒加载插件 `lazyLoad`

## [1.8.1] - 2018-05-14

### Changed

- `xui.js` 注释与错误提示改为英文
- 删除 `xui.css` 注释以节约体积

## [1.8.0] - 2018-04-25

### Added

- 穿梭框插件 `transfer`

## [1.7.9] - 2018-04-10

### Improved

- 补零方法改名为 `xui.zeroFill()`（**Breaking**：使用旧方法名需修改）

## [1.7.8] - 2018-03-21

### Fixed

- 修复图片预览左右旋转图标展示问题
- 优化日历插件年月切换顺序，向 ant design 看齐

## [1.7.7] - 2018-03-16

### Added

- 新增 `ajax` 异步请求方法
- 新增类似 Vue 双向绑定的简单例子
- 代码编写更加规范

## [1.7.6] - 2018-03-08

### Added

- 复制剪贴板插件 `copyToClipBoard`

## [1.6.6] - 2018-03-01

### Fixed

- 修复 `loading` / `prompt` 插件类名问题

## [1.6.5] - 2018-02-22

### Added

- 滑动选择框 `sliderBar`

## [1.5.5] - 2018-02-12

### Fixed

- 修复分页输入数字回车缺少回调的 bug
- 部分文案调整

## [1.5.4] - 2018-01-30

### Added

- 数字输入框插件 `digital`

## [1.4.4] - 2018-01-21

### Added

- 插件部分新增淡入 / 向下滑动动画

## [1.4.3] - 2018-01-11

### Added

- flex 布局样式

## [1.4.2] - 2018-01-11

### Added

- 手风琴插件 `collapse`

## [1.3.2] - 2018-01-01

### Added

- 三级联动插件 `cascader`

## [1.2.2] - 2017-12-25

### Added

- 雪花插件 `snowFlake`

## [1.1.2] - 2017-12-20

### Added

- 幻灯片插件支持显示左右按钮切换和右下角圆点

## [1.1.1] - 2017-12-10

### Added

- 全屏滚动插件支持手机端，配置项更丰富

## [1.1.0] - 2017-12-01

### Added

- 全屏滚动插件 `fullPage`

## [1.0.0] - 2017-11-21

### Added

- 下拉加载插件 `scrollLoad`

## [0.9.0] - 2017-11-15

### Added

- 幻灯片插件 `slider`

## [0.8.0] - 2017-10-21

### Added

- 分页插件 `pagination`

## [0.7.0] - 2017-10-16

### Added

- 日历插件 `calendar`

## [0.6.2] - 2017-10-07

### Added

- 插件模块新增使用及参数说明

## [0.6.1] - 2017-10-01

### Added

- 倒计时插件 `countDown`

## [0.5.1] - 2017-09-26

### Added

- 对 cookie 的操作（新增、查询、删除）

## [0.5.0] - 2017-09-21

### Added

- 下拉框插件 `dropDown`

## [0.4.0] - 2017-09-24

### Changed

- **Breaking**：`window` 上的方法名 `xu` 改为 `xui`
- 图片预览插件支持下载修改文件名（同域下）

## [0.3.0] - 2017-09-13

### Added

- tab 切换插件 `tabChange`

## [0.2.0] - 2017-09-05

### Added

- 图片预览插件 `imgShow`

## [0.1.2] - 2017-09-01

### Added

- 常用插件列表

## [0.1.1] - 2017-08-21

### Added

- 常用方法

## [0.1.0] - 2017-08-12

### Added

- 样式规范

## [0.0.1] - 2017-07-21

### Added

- 项目初始化
