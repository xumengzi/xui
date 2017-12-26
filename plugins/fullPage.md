<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# fullPage

>说明: 代码比jQuery的fullPage要少很多, 但是功能却没有少很多哦

##### 使用及参数说明:
```html
<div id="fullPage" class="xui_full_page">
	<div>一</div>
	<div>二</div>
	<div>三</div>
	<div>四</div>
	<div>五</div>
</div>
```
```js
xui.fullPage({
	id: string,
	currentPage: number,
	direction: string,
	isShowDot: boolean,
	transition: string,
	fn: function(prev, curr){
		console.log(prev);
		console.log(curr);
	}
});
```
* 复制好html, 然后给你的全屏滚动一个响亮的id, 接下来你就知道怎么做了吧!?
* `id`全屏滚动`id` **必传**
* `currentPage`表示全屏滚动默认显示哪一张, 从0开始计算
* `direction`表示滚动方向, 支持水平方向`X`, 垂直方向`Y`, 默认是垂直方向
* `isShowDot`表示是否显示当前页和总页数, 格式为1/5
* `transition`表示动画的过渡的特效, 可以随意配置哦! 就像写`css`的`transition`一样, 期待你的更多发现
* 'fn'表示动画的回调了, 返回当前和之前2个元素
* 没有你想要的功能? 快联系我: `me@xumengzi.top`添加吧

### 效果展示

1.因为需要全屏展示,所以我在这里放一个链接哦,更多请自行探寻
>说明:全屏特效请戳这里[戳我看看](https://jarveniv.github.io/xui.js/fullPage.html)

```html
<div id="fullPage" class="xui_full_page">
	<div>一</div>
	<div>二</div>
	<div>三</div>
	<div>四</div>
	<div>五</div>
</div>
```
```js
xui.fullPage({
	id: 'fullPage',
	currentPage: 1,
	direction: 'Y',
	isShowDot: true,
	transition: '0.8s cubic-bezier(0.4, -0.57, 0.57, 1.23)',
	fn: function(prev, curr){
		console.log(prev);
		console.log(curr);
	}
});
```