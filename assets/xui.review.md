# `xui.js` 组件 Review 与改进备忘

> 这份文档记录了 `assets/xui.js` 里 16 个组件 + 若干工具方法的深度 review。
>
> `xui.js` 从 2017 年写到今天，跨越了 9 年。它记录了作者从前端小白一步步走过来的痕迹 ——
> 从 `var`、`for...in`、`arguments[0]` 到 `class`、`Symbol`、`Object.assign`，
> 每一个组件都是那个阶段"想到什么就实现什么"的产物。
>
> 本文档不是要否定过去的代码，而是**为未来的重构提供地图**。
> 每一条改进都写得尽可能具体，方便未来的自己（或其他人）按图索骥。

---

## 目录

- [写在前面](#写在前面)
- [组件共性问题](#组件共性问题)
- [16 个组件逐个诊断](#16-个组件逐个诊断)
- [工具方法 / 全局污染部分](#工具方法--全局污染部分)
- [架构层面的建议](#架构层面的建议)
- [优先级建议](#优先级建议)
- [未来重构路径](#未来重构路径)

---

## 写在前面

先说三件事：

1. **这份代码是能跑的**。16 个组件都真实工作过、被文档站演示过、被 `farewell/`、`love/` 里的静态 HTML 用过。它不是"废代码"，是"老代码"。
2. **老代码的价值在于连续性**。它见证了 ES5 → ES6 → 类 → 模块化的迁移过程。有些"坏味道"（比如 `var`、`for...in + hasOwnProperty`、`arguments[0]`）其实是那个年代的"最佳实践"，不必回头责怪。
3. **改动的原则**：能修的 bug 立刻修（已完成 8 处 🔴 修复），API 设计问题**慢慢来**、**别重写**。重写常常引入新 bug，不如逐个组件"外科手术式"迁移到 `packages/`。

---

## 组件共性问题

在逐个诊断之前，先把 16 个组件普遍存在的问题归纳出来 —— 这些问题**改一次就能受益于所有组件**，效率最高。

### 1. 无 `destroy()` / `unmount()` API

**影响**：全部 16 个组件。

在 SPA 里，路由切换后组件的 DOM 被移除，但绑定在 `window` / `document.body` 上的事件监听器、`setInterval` 定时器、以及闭包引用还都在。日积月累就是内存泄漏。

**改法示范**：

```js
class Slider {
  constructor(el, opts) {
    this.el = el
    this.opts = { ...defaults, ...opts }
    this._listeners = []  // 记录所有 addEventListener
    this._timers = []     // 记录所有 setInterval/setTimeout
    this._init()
  }

  _on(target, event, handler, options) {
    target.addEventListener(event, handler, options)
    this._listeners.push([target, event, handler, options])
  }

  destroy() {
    for (const [t, e, h, o] of this._listeners) t.removeEventListener(e, h, o)
    for (const id of this._timers) clearInterval(id)
    this._listeners = this._timers = null
    this.el.innerHTML = ''
  }
}
```

### 2. `element.onclick = fn` / `window.onscroll = fn` 覆盖式绑定

**影响**：`calendar`, `dropDown`（已修）, `collapse`, `digital`, `transfer`, `cascader`, `scroll`, `fullPage`, `lazyLoad`, `waterMark` 等一半以上组件。

一个页面同时用两个 `xui.collapse()` 时，第一个的 handler 会被第二个覆盖掉。

**改法**：`addEventListener` 是唯一正确写法。虽然要多写几个字，但换来的是"组件可以任意多次实例化"。

### 3. 定时器无清理

**影响**：`slider`（`this.defaults.timer`）、`countDown`（局部 `downTime`）、`pastTime`、`digitalScroll`（`this.timer`）、`backToTop`（`this.opts.timer`）。

有的定时器 id 存到实例上还好，可以在 destroy 时 clearInterval。**最糟的是 `countDown` / `pastTime`**：`downTime` 是局部变量，函数返回后外部完全拿不到 → **无法停止**。

### 4. `innerHTML` 拼接用户输入 —— XSS 隐患

**影响**：几乎所有渲染组件。举几个例子：

```js
// message
tar.innerHTML = `<span>${arguments[0]}</span>`
// prompt
`<div class="tips">${opts.text}</div>`
// loading
`${string ? `<div>${string}</div>` : ``}`
// slider
`<img src="${imgs[i].img}">`
// transfer
`<li title="${i.value}">${i.value}</li>`
```

用户传入 `'<img src=x onerror=alert(1)>'` 就会执行。

**改法**：能用 `textContent` 就用 `textContent`；必须用 `innerHTML` 的地方，用户可控的字段先经过转义：

```js
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]))
}
```

### 5. 组件通过 `id` 而非 `element` 定位

**影响**：全部 16 个组件都是 `document.getElementById(opts.id)`。

问题：
- 同一个组件不能同页出现多次（id 唯一）
- 不能在 Shadow DOM / Web Component 里用
- 单元测试难写（要构造 DOM 并塞 id 到 body）

**改法**：签名统一为 `new Slider(elementOrSelector, options)`，内部：

```js
this.el = typeof target === 'string' ? document.querySelector(target) : target
```

### 6. 缺少实例方法暴露

**影响**：`pagination`（无 `setPage`）、`slider`（无 `next/prev/goTo`）、`cascader`（无 `setValue/getValue`）、`digital`（无 `getValue`）等。

现在你只能"创建组件、传回调"，无法在外部主动控制。用户很痛苦。

### 7. `for...in` + `hasOwnProperty` 遍历数组

出现在**十几处**（`deleteEle`、`dropDown`、`tab`、`objCopy`、`slider.renderHTML`、`cascader.renderHTML`、`lazyLoad.renderHTML`……）。

现代写法：`for...of` 或 `forEach`；转数组用 `Array.from()` 或 `[...nodeList]`。

### 8. 死代码：CSS 浏览器前缀

`slider` / `fullPage` / `pullLoad` 都手写了：

```js
tar.style.transform = ...
tar.style.webkitTransform = ...  // 2015 年之后就不需要了
tar.style.mozTransform = ...      // Firefox 15 之前
tar.style.MsTransform = ...       // IE 9
```

现代浏览器全部支持标准 `transform`。删掉；真要兼容老浏览器，交给 CSS 层的 autoprefixer 处理。

---

## 16 个组件逐个诊断

### 1. `calendar`（日历） `[L940-1218]`

**结构**：模块级单例 `const cal = {...}`。工厂函数 `calendar()` 直接改 `cal.config`。

| 严重度 | 问题 |
|---|---|
| 🔴 | **单例设计 → 同页只能有一个日历**。第二次 `xui.calendar({...})` 会覆盖第一个的 config、事件监听 |
| 🟠 | `renderHTML` 里 `todayText = ...` 没有 `let`，泄漏为全局变量 |
| 🟠 | `type == 1/2/3/4` 魔法数字（应改为 `'prev-month'` / `'prev-year'` / `'next-year'` / `'next-month'`） |
| 🟠 | `new Date('2023-6')` 在 iOS Safari 会 Invalid Date（应统一写 `'2023-06-01'`） |
| 🟠 | 第 1063 行 class 里 `${isStarted} ${isStarted}` 明显笔误（该是 `${isStarted} ${isEnded}`），导致上个月的失效日期判断只用了开始日期 |
| 🟠 | `getAttribute('data-set') -= 0` 隐式转数字，可读性差 |

**改造建议**：
- 拆成 `class Calendar` 实例化
- config 挂 `this`，允许同页多实例
- 类型改成 `enum: 'prev-month' | 'prev-year' | 'next-month' | 'next-year'`
- 修复 `${isStarted} ${isStarted}` 笔误

### 2. `pagination`（分页） `[L1223-1327]`

| 严重度 | 问题 |
|---|---|
| 🟠 | 缺乏 `setPage(index)` / `getPage()` / `setTotal(total)` 外部方法 |
| 🟠 | jump input 没有明显的"回车提交"提示 |
| 🟠 | `isShowDot` / `isShowNum` / `isJumpPage` 三个 boolean 强耦合 |

**改造建议**：组件里最简单的一个，可以先重构、当作其他组件的模板。

### 3. `slider`（幻灯片） `[L1333-1445]`

| 严重度 | 问题 |
|---|---|
| 🔴 | `setInterval` 存到 `defaults.timer`，实例销毁后**不自动停止** |
| 🔴 | `handleCountAng.bind(this)` 每次生成新函数，`removeEventListener` **无法真正解绑**（第 1369 行） |
| 🟠 | `imgList` 为空时 `each = 100 / 0 = Infinity` |
| 🟠 | 三种浏览器前缀死代码 |
| 🟠 | `imgs[i].img` 直接 `<img src="${...}">` → XSS |
| 🟠 | 没有 `next()` / `prev()` / `goTo(i)` / `pause()` / `resume()` 方法 |

**改造建议**：
- `this._boundHandler = this.handleCountAng.bind(this)`，保存引用后 removeEventListener 才能解绑
- 图片 URL 用 `img.setAttribute('src', url)` 而非模板字符串

### 4. `scroll`（滚动加载） `[L1451-1502]`

| 严重度 | 问题 |
|---|---|
| 🔴 | **模块级 `let that = null`**，同页多实例会互相污染 |
| 🔴 | `tar.onscroll = fn` 覆盖式绑定 |
| 🔴 | scroll 事件**没有节流**（每帧触发） |
| 🟠 | `getScrollHeight` / `getScrollTop` 手写兼容代码，现代浏览器完全不需要 |

**改造建议**：**整个组件用 `IntersectionObserver` 重写**，20 行代码可以搞定，且性能提升 100 倍：

```js
class Scroll {
  constructor(el, { onReachBottom }) {
    this.sentinel = document.createElement('div')
    el.appendChild(this.sentinel)
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) onReachBottom()
    })
    this.observer.observe(this.sentinel)
  }
  destroy() { this.observer.disconnect(); this.sentinel.remove() }
}
```

### 5. `fullPage`（全屏滚动） `[L1508-1650]`

| 严重度 | 问题 |
|---|---|
| 🔴 | 模块级 `page` 单例，同页多实例互相破坏 |
| 🔴 | `w.onwheel = e => ...` 覆盖 window handler |
| 🔴 | wheel 事件**没有节流**：一次滑动会连续触发几十次 → 快速切好几页 |
| 🔴 | 判断"当前位置"用 `sty.transform == "translateY(0%)"` 字符串比较，浏览器可能返回 `matrix(1,0,0,1,0,0)` → **极其脆弱** |
| 🟠 | `getParentEle` 里 `if (i++ > 10)` 是 `i++`（后置），外层已经 `i++` 过一次，逻辑重复 |

**改造建议**：
- 用 `data-page-current="true"` 属性代替 style 字符串比较
- wheel 加节流 300ms
- touch 事件加 `passive: false` 才能 preventDefault

### 6. `cascader`（三级联动） `[L1655-1749]`

| 严重度 | 问题 |
|---|---|
| 🔴 | onchange 里调 `renderHTML`，`renderHTML` 里又 `this.event()` 重新绑事件 → **每次操作事件监听翻倍** |
| 🔴 | **硬编码只支持 3 级**，名字叫 cascader 应该支持任意级 |
| 🟠 | for-in 三层嵌套 O(n³) 完整遍历，只为了找当前选中项 |
| 🟠 | `data` 结构靠 `rep: { firKey, firList, secKey, secList, thiKey }` 五个 key 映射，用户接入痛苦 |
| 🟠 | value 和 label 未分离（`<option value=${f[a]}>${f[a]}</option>`） |

**改造建议**：接受统一树形数据 `[{ value, label, children: [...] }]`，递归渲染。

### 7. `collapse`（手风琴） `[L1755-1812]`

| 严重度 | 问题 |
|---|---|
| 🔴 | `tar.onclick = fn` 覆盖式 |
| 🟠 | `each.content` 直接 `innerHTML` → 若含 HTML 会执行 |
| 🟠 | 缺少 `expand(i)` / `collapse(i)` 外部方法 |

### 8. `digital`（数字输入框） `[L1818-1915]`

| 严重度 | 问题 |
|---|---|
| 🔴 | `tar.onclick = fn` 覆盖式 |
| 🔴 | 浮点精度：`int.value - 0 + step > max` 用浮点计算，`0.1 + 0.2 = 0.30000000000000004` |
| 🟠 | 正则 `/^[\+\-\.]?(\d)*\.*\d+$/` 允许 `1.2.3` 通过（`.` 后有 `\.*`） |
| 🟠 | `isLimit` 命名反直觉，应叫 `maxLength` |
| 🟠 | +/- 按钮没做防抖，键盘长按触发频率过高 |

**改造建议**：用 `Math.round(x * 1e6) / 1e6` 或 BigNumber 做浮点安全计算。

### 9. `sliderBar`（滑动选择框） `[L1922-2040]`

| 严重度 | 问题 |
|---|---|
| 🔴 | `getPosition` 依赖 `getBoundingClientRect().left`，页面滚动后**位置错乱** |
| 🔴 | **完全不支持触屏**（没有 touchstart / touchmove / touchend） |
| 🟠 | `getCurrentvalue` 拼写（应为 `getCurrentValue`） |
| 🟠 | `setCurrentValue(cur, total)` 里 `total` 语义不明 |

### 10. `transfer`（穿梭框） `[L2045-2196]`

| 严重度 | 问题 |
|---|---|
| 🔴 | `tar.onclick = fn` 覆盖式 |
| 🟠 | 每次操作后**完全重新 renderHTML**，选中状态、滚动位置都丢失 |
| 🟠 | `data-disabled` 存 boolean，读回来是字符串 `'true'/'false'`，类型混乱 |
| 🟠 | `<li title="${i.value}">${i.value}</li>` → XSS |
| 🟠 | 数据结构 `[{ value, disabled }]`，没 label 分离、没分组、没搜索 |

**改造建议**：内部状态用 `Set` 存 selected value，只更新 class 而非全量重渲。

### 11. `lazyLoad`（懒加载） `[L2201-2263]`

| 严重度 | 问题 |
|---|---|
| 🔴 | `window.onscroll = fn` 覆盖式 |
| 🔴 | **scroll 无节流**，每次滚动都遍历所有图片 |
| 🔴 | 图片进入视口后**没有 unobserve**，一直在 check |
| 🟠 | 手写 `isElementInViewport`，浪费 |

**改造建议**：**整个用 `IntersectionObserver` 重写**：

```js
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return
    const img = entry.target
    img.src = img.dataset.src
    img.removeAttribute('data-src')
    io.unobserve(img)  // 加载后立即取消观察
  })
})
document.querySelectorAll('.xui_img_load[data-src]').forEach(img => io.observe(img))
```

### 12. `pullLoad`（下拉刷新） `[L2269-2348]`

| 严重度 | 问题 |
|---|---|
| 🔴 | `mousedown` 时 `e.preventDefault()` 会吞掉一些默认行为 |
| 🔴 | 上拉边界判断 `disY > 0 && disY <= maxScrollHeight`，用户拉过头就不动了 |
| 🟠 | `reSet` 里 `let timer = null; clearTimeout(timer)` 是死代码（永远清 null） |
| 🟠 | `pullMove` 里没有 `requestAnimationFrame`，直接改 style，性能差 |
| 🟠 | API 命名 `finished()` 与其他组件的 `destroy() / reset()` 不一致 |

### 13. `digConverse`（进制转换） `[L2354-2384]`

| 严重度 | 问题 |
|---|---|
| 🔴 | **顶层 `var arr = []; var sign = 0`** —— **全局共享状态**！并发调用互相污染 |
| 🔴 | `arr.unshift(x)` 是 O(n)，尾递归改成循环性能会好很多 |
| 🟠 | 只支持"十进制转其他"，转回来没有 |
| 🟠 | `throw Error(...)` 少了 `new`（能跑，但不规范） |

**改造建议**：**直接删掉这个组件**。JavaScript 原生已经内置：

```js
(255).toString(16)         // 'ff'
(255).toString(2)          // '11111111'
parseInt('ff', 16)         // 255
```

一行搞定，比 30 行手写的更快、更正确、并发安全。

### 14. `xmap / xfind / xreduce`（原型污染） `[L2389-2442]`

| 严重度 | 问题 |
|---|---|
| 🔴 | **污染 `Array.prototype`**，与其它库可能冲突 |
| 🔴 | `xfind` 名字叫 find，行为却是 **filter**（返回所有符合条件的元素） |
| 🔴 | `xreduce` 语义与原生 reduce 不同：无初值时原生跳过 `arr[0]` 并以 `arr[0]` 为累加器；这里从 `NUM=0` 开始 |
| 🔴 | `if (initVal)` 传 `0` / `''` / `false` 会被误判为"没传初值" |

**改造建议**：**直接删掉**（原生 `Array.prototype.map / find / filter / reduce` 都已 15 年历史）。如果保留，请：
- 改名 `xui.map(arr, fn) / xui.find(arr, fn) / xui.reduce(arr, fn, initVal)`
- 从 `Array.prototype` 移到 `xui` 命名空间

### 15. `digitalScroll`（数字滚动动画） `[L2447-2489]`

| 严重度 | 问题 |
|---|---|
| 🔴 | 用 `setInterval` + `innerHTML` 每帧改数字 —— 卡顿严重（应用 `requestAnimationFrame` + `textContent`） |
| 🔴 | **`prevVal` 参数从未使用**，起点永远是 0 |
| 🔴 | 不支持浮点、递减、千分位格式化 |
| 🟠 | 挂载名 `digitalscroll`（小写 s），与其他组件命名不一致（应为 `digitalScroll`） |

### 16. `backToTop`（返回顶部） `[L2645-2735]`

| 严重度 | 问题 |
|---|---|
| 🔴 | `cancelAnimationFrame(this.scroll.bind(this))` —— `bind` 每次产生新函数，**这个调用永远拿不到正确的 id**，动画永远不会被真正取消 |
| 🔴 | `target` 参数支持数组，但 `document.querySelector(`.${item}`)` 只取单个 |
| 🟠 | `title` 通过 `innerHTML` 塞入 → XSS |
| 🟠 | 现代浏览器一行搞定：`window.scrollTo({ top: 0, behavior: 'smooth' })` |

### 番外：`waterMark`（水印） `[L2738-末尾]`

| 严重度 | 问题 |
|---|---|
| 🔴 | `window.onresize = fn` 覆盖式 |
| 🔴 | resize 时**完全重新生成 DOM**（几百个 span），性能极差 |
| 🟠 | `title` 通过 `innerHTML` 塞入 → XSS |

**改造建议**：用 canvas 生成一张水印图片作为 `background-image: repeat`，只需要生成一次。

---

## 工具方法 / 全局污染部分

除了 16 个 UI 组件，`xui.js` 主对象上还挂了 40+ 工具方法。大部分已经在前一轮 review 里覆盖，这里只补充几个特别的：

- `generateBooks()` `[L315-371]` —— 依赖 `document.getElementById('myBook')`，**是文档站一个 demo 的专属代码**，不应该出现在通用组件库里
- `showImg()` / `showAnimatedImg()` —— 用 case 1/2/3/4 魔法数字表示"左旋/放大/缩小/右旋"
- `twoWayBinding` —— 名字叫"双向绑定"，实际实现的是"电话号码格式化"

---

## 架构层面的建议

### A. 统一"组件契约"

每个组件目前的构造方式、返回结构、销毁方式都不一样。建议定义一个基类：

```js
class BaseComponent {
  constructor(el, options) {
    this.el = typeof el === 'string' ? document.querySelector(el) : el
    this.opts = { ...this.constructor.defaults, ...options }
    this._listeners = []
    this._timers = []
    this.mount()
  }

  _on(target, event, handler, options) {
    target.addEventListener(event, handler, options)
    this._listeners.push([target, event, handler, options])
  }
  _setInterval(fn, ms) {
    const id = setInterval(fn, ms)
    this._timers.push(id)
    return id
  }

  mount() { throw new Error('subclass must implement mount()') }
  update(newOpts) { Object.assign(this.opts, newOpts); this.mount() }
  destroy() {
    this._listeners.forEach(([t, e, h, o]) => t.removeEventListener(e, h, o))
    this._timers.forEach(clearInterval)
    this._listeners = this._timers = null
    if (this.el) this.el.innerHTML = ''
  }
}
```

### B. 事件系统统一（EventEmitter 模式）

现在各种回调命名混乱（`fn` / `onClick` / `dragStart` / `dragMove` / `dragEnd` / `fnComplete`）。建议：

```js
const slider = new Slider(el, { imgList: [...] })
slider.on('change', (index) => console.log(index))
slider.on('destroy', () => ...)
slider.off('change', handler)
```

好处：可多个订阅者、可解绑、语义清晰。

### C. 拥抱现代浏览器 API

| 组件 | 现在实现 | 现代方案 |
|---|---|---|
| `lazyLoad` | window.onscroll + 手写视口检测 | `IntersectionObserver` |
| `scroll` | onscroll 检查底部 | `IntersectionObserver` 观察哨兵元素 |
| `waterMark` | onresize 重新生成 DOM | `ResizeObserver` + canvas 背景图 |
| `backToTop` | 手写 rAF 滚动动画 | `window.scrollTo({ behavior: 'smooth' })` |
| `debounce` / `throttle` | 手写 | 保留 —— 但可以加 `cancel()` / `flush()` |

### D. 逐步 TypeScript 化

不必一次全改，加 `.d.ts` 声明文件即可让用户获得类型提示。

### E. 加单元测试

现在这些 bug（比如 `if (!isNaN)` 永远失败、`isMobile` 用 Math.random）没被发现的根本原因是**从来没测过**。Vitest 十几个基础用例可以挡掉 80% 的手误。

---

## 优先级建议

| 档位 | 修哪些 | 理由 |
|---|---|---|
| 🔴 **必修** | scroll 全局 `that` 污染 · digConverse 全局 state · Array.prototype 污染 · backToTop 的 cancelAnimationFrame 无效 · fullPage wheel 无节流 · slider `bind` 无法解绑 · calendar 单例污染 | 严重 bug 或全局污染，可能导致数据错乱 |
| 🟠 **建议修** | 所有 `onclick=`/`onscroll=`/`onwheel=`/`onresize=` 改 `addEventListener` · 所有渲染组件的 XSS 隐患 | 一致的架构问题，可以批量改 |
| 🟡 **重构** | lazyLoad / scroll 换 `IntersectionObserver` · 加 `destroy()` API · innerHTML 改 textContent | 现代化改造 |
| 🟢 **删除** | `digConverse`（原生 `.toString(b)`）· `xmap/xfind/xreduce`（原生更好）· `generateBooks`（demo 代码不该在库里） | 减法，代码更清爽 |

---

## 未来重构路径

不建议一次性重写整个 `xui.js`，那样风险太高。推荐**渐进式**：

### Phase 1（🔴 立即，1 天内）

**只修 bug，不改 API**。这些改动老页面完全无感知，只是"隐藏 bug 消失了"：

- [x] `slider._boundHandler = this.handleCountAng.bind(this)` 保存引用，让 removeEventListener 真的能解绑
- [x] `scroll` 里模块级 `let that` 挪到 `this` 上
- [x] `digConverse` 里 `arr / sign` 挪到函数内（**通过删除整个组件解决**）
- [x] `backToTop` 里保存 `requestAnimationFrame` 返回的 id 用于 cancel
- [x] `fullPage` wheel 事件加节流 800ms
- [ ] `calendar` 拆掉 `cal` 单例，`config` 挂到函数实例上（**这个最复杂，暂缓**）
- [x] 修 `calendar.renderHTML` 第 1063 行 `${isStarted} ${isStarted}` 笔误

### Phase 2（🟠 中期，几周）

**统一事件绑定**、**统一定时器管理**：

- [ ] 建立 `BaseComponent` 基类
- [ ] 所有 `x.onXxx = fn` 改成 `addEventListener`
- [ ] 所有 `setInterval` / `setTimeout` 存到 `this._timers`
- [ ] 每个组件加 `destroy()` 方法

### Phase 3（🟡 长期，看兴趣）

**接口现代化**：

- [ ] 组件接受 `element` 而非 `id`
- [ ] 用 EventEmitter 统一回调
- [ ] `lazyLoad` / `scroll` 换 IntersectionObserver
- [ ] 补齐 `packages/` 里缺失的 7 个组件
- [ ] 逐步将 `packages/` 作为单一源，用构建产出 `assets/xui.js`
- [ ] 加 TypeScript 声明
- [ ] 加 Vitest 测试

### Phase 4（🟢 数月，如果还愿意做）

- [ ] TypeScript 重写
- [ ] Web Components 版本

---

## 已完成的修复（历次记录）

### 第 1 轮：8 处 🔴 严重 Bug（2026-08）

在工程化改造中已修复，记录在 CHANGELOG 里：

| # | 位置 | 内容 |
|---|---|---|
| 1 | `formatNumber` | `if (!isNaN)` → `Number.isNaN(number)` |
| 2 | `loading` | 消除全局变量泄漏 `type = undefined`，通过参数接收 type |
| 3 | `checkLegal` | 加 default 分支；mobile 正则放宽到 `1[3-9]` |
| 4 | `countDown` | 移除硬编码 `hour - 8`，修正时区错误 |
| 8 | `isMobile` | `Math.random() > .5 ? ...` → `\|\|` |
| 10 | `setCookie` | `setDate(days)` → `setDate(getDate() + days)`；`toUTCString()` |
| 11 | `dropDown` / `calendar` | `document.body.onclick = fn` → `addEventListener` |
| 38 | `message` / `showImg` / `showAnimatedImg` | `deleteEle('xxx')` 缺 `.` 前缀 |

### 第 2 轮：Phase 1 + 删除档（2026-08）

按本文档 Phase 1 清单执行：

| 类型 | 位置 | 内容 |
|---|---|---|
| Phase 1 | `slider` | `_boundHandleCountAng` 保存 bind 引用，`removeEventListener` 真正生效 |
| Phase 1 | `scroll` | 模块级 `let that` → 实例 `this`，支持同页多实例 |
| Phase 1 | `backToTop` | 保存 `requestAnimationFrame` 返回 id，`cancelAnimationFrame` 真正生效 |
| Phase 1 | `fullPage` | wheel 事件加 800ms 冷却式节流 |
| Phase 1 | `calendar` | 修复 `${isStarted} ${isStarted}` → `${isStarted} ${isEnded}` 笔误 |
| 🟢 删除 | `digConverse` | 删除整个组件（附带解决全局 `arr/sign` 污染） |
| 🟢 删除 | `xmap/xfind/xreduce` | 删除，不再污染 `Array.prototype` |
| 🟢 删除 | `generateBooks` | 删除，文档站 demo 专属代码不应在库里 |

文件从 2807 行减少到 2694 行（-113 行）。

### 剩余 Phase 1 任务

- [ ] `calendar` 拆掉 `cal` 单例（涉及重构，暂缓）


---

## 尾声

这份代码从 2017 年写到现在。9 年，是一个前端小白成长为工程师的时间。

代码里那些 `for (let i in list) { if (list.hasOwnProperty(i)) { ... } }` 的写法，
是 2017 年前端社区最主流的"防御性遍历"—— 因为那年 Object.prototype 污染库还没完全消失。

那些 `-webkitTransform` / `-mozTransform`，是那个年代给 IE 9 / iOS 6 让路的痕迹。

那些 `arguments[0]` 而不是命名参数，是"能跑就好"的实用主义。

**这些不是缺点，是化石**。看到它们，就能想起当年的自己在解决什么问题。

新的代码可以在 `packages/` 里慢慢写，用现代方式。老的 `xui.js` 就让它在那里，
继续为 `farewell/` / `love/` 里那些私人纪念页面服务。

代码是自我的一部分。留下它，也留下当年那个不断学习的自己。

—— 2026 年一次全面 review 的记录
