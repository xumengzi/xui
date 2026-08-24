/**
 * 文档站点专用脚本（非组件库源码）
 * 用途：
 *   1) Google Tag Manager
 *   2) 特殊日期页面置灰
 *   3) 文档站点顶部水印（依赖 xui.js 暴露的 waterMark 类）
 *
 * 在 GitBook / VitePress 模板中单独引入，不要打进 xui 组件库产物。
 */
(function () {
  // 1) Google Tag Manager
  (function (w, d, s, l, i) {
    w[l] = w[l] || []
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
    var f = d.getElementsByTagName(s)[0]
    var j = d.createElement(s)
    var dl = l !== 'dataLayer' ? '&l=' + l : ''
    j.async = true
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
    f.parentNode.insertBefore(j, f)
  })(window, document, 'script', 'dataLayer', 'GTM-NFNL3B9')

  // 2) 特殊纪念日页面置灰
  //    4.4  哀悼抗击新冠肺炎疫情斗争牺牲的烈士和逝世同胞
  //    5.12 汶川地震纪念日
  //    12.13 南京大屠杀死难者国家公祭日
  var mourningDates = ['4.4', '5.12', '12.13']
  var d = new Date()
  var key = d.getMonth() + 1 + '.' + d.getDate()
  if (mourningDates.indexOf(key) !== -1) {
    document.documentElement.style.filter = 'grayscale(1)'
  }

  // 3) 文档站点版本水印（可选，需要 xui.js 已加载并暴露 waterMark 类）
  if (typeof window.waterMark === 'function' && typeof window.xuiVersion !== 'undefined') {
    // eslint-disable-next-line no-new
    new window.waterMark({
      title: 'xui v' + window.xuiVersion,
      color: 'rgba(255,255,255, .2)',
    })
  }
})()
