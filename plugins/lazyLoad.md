<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 3.3.0 lazyLoad

>说明: 用来提升用户体验, 降低服务器开销

##### 使用及参数说明:
```js
new xui.lazyLoad({
	id: string,
	loadingImg: string,
	errorImg: string,
	hrefTarget: string,
	list: array,
});
```
* `id`表示lazyLoad的容器 **必传**
* `loadingImg`表示图片加载的loading效果, 传入图片的url即可, 默认值为菊花loading图
* `errorImg`表示图片加载失败的时候显示的图片, 默认值为一张404图片
* `hrefTarget`表示点击图片的跳转链接(如果有), 默认值为当前页面
* `list`表示需要加载的图片资源, 数组格式(支持单纯的数组, 对象形式的数组) **必传**
* 没有你想要的功能? 快联系我: `me@xumengzi.top`添加吧


### 效果展示

##### 默认是栅栏式

1.先来一个最简单的懒加载, 没有那些花里胡哨的配置, [戳我看看](https://xumengzi.github.io/xui/examples/lazyLoad.html)

```js
new xui.lazyLoad({
	id: 'lazyLoad',
	list: [
		"http://img.infinitynewtab.com/wallpaper/15.jpg",
		"http://img.infinitynewtab.com/wallpaper/25.jpg",
		"http://img.infinitynewtab.com/wallpaper/35.jpg",
		"http://img.infinitynewtab.com/wallpaper/45.jpg",
		"http://img.infinitynewtab.com/wallpaper/55.jpg",
	]
});
```

2.我们可以传入有链接的图片以及一些配置等等, [戳我看看](https://xumengzi.github.io/xui/examples/lazyLoad-href.html)

```js
new xui.lazyLoad({
	id: 'lazyLoad1',
	hrefTarget: '_blank',
	list: 
	[
		{
			href: 'https://xumeng.site/',
			src: 'http://img.infinitynewtab.com/wallpaper/error.jpg'
		},
		{
			href: 'https://xumengzi.gitbooks.io/xui/content/',
			src: 'http://img.infinitynewtab.com/wallpaper/2.jpg'
		},
		{
			href: 'https://github.com/xumengzi',
			src: 'http://img.infinitynewtab.com/wallpaper/3.jpg'
		}
	]
});
```