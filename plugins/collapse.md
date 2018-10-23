<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 3.2.5 collapse

>说明: 需要展示复杂的内容时使用手风琴插件

##### 使用及参数说明:
```html
<div id="collapse" class="xui_collapse"></div>
```
```js
new xui.collapse({
	id: string,
	isOneTab: boolean,
	activeTab: number,
	list: array,
	fn: function(a, b){
		console.log(a, b);
	}
});
```
* 复制好html, 然后给你的全屏滚动一个响亮的id, 接下来你就知道怎么做了吧!?
* `id`手风琴插件`id` **必传**
* `isOneTab`表示是否允许其它内容展示, `true`展示一个模块, 'false'互相之间不影响
* `activeTab`表示默认展示哪一个模块, 默认展示第一个
* `list`表示手风琴数据, 支持带标签的元素等等 **必传**
* `fn`表示切换的回调, 返回的是当前`tab`的头部和内容信息
* 没有你想要的功能? 快联系我: `me@xumengzi.top`添加吧

### 效果展示

1.默认展示第一个模块内容

<div id="collapse1" class="xui_collapse"></div>
<script>
new xui.collapse({
	id: 'collapse1',
	list: [
		{
			title : 'header1',
			content: '<em>我在em标签里</em>',
		},
		{
			title : 'header2',
			content: 'body2',
		},
		{
			title : 'header3',
			content: 'body3',
		},
		{
			title : 'header4',
			content: 'body4',
		}
	],
	fn: function(a, b){
		console.log(a, b);
	}
});
</script>

```html
<div id="collapse1" class="xui_collapse"></div>
```
```js
new xui.collapse({
	id: 'collapse1',
	list: [
		{
			title : 'header1',
			content: '<em>我在em标签里</em>',
		},
		{
			title : 'header2',
			content: 'body2',
		},
		{
			title : 'header3',
			content: 'body3',
		},
		{
			title : 'header4',
			content: 'body4',
		}
	],
	fn: function(a, b){
		console.log(a, b);
	}
});
```

2.让我们来稍微配置一下, 显示第三个`tab`,也可以同时展示所有的内容

<div id="collapse2" class="xui_collapse"></div>
<script>
new xui.collapse({
	id: 'collapse2',
	isOneTab: false,
	activeTab: 2,
	list: [
		{
			title : 'header1',
			content: '<p>我在p标签里</p>',
		},
		{
			title : 'header2',
			content: 'body2',
		},
		{
			title : 'header3',
			content: '<h2>我在h2标签里</h2>',
		},
		{
			title : 'header4',
			content: 'body4',
		}
	],
	fn: function(a, b){
		console.log(a, b);
	}
});
</script>

```html
<div id="collapse2" class="xui_collapse"></div>
```
```js
new xui.collapse({
	id: 'collapse2',
	isOneTab: false,
	activeTab: 2,
	list: [
		{
			title : 'header1',
			content: '<p>我在p标签里</p>',
		},
		{
			title : 'header2',
			content: 'body2',
		},
		{
			title : 'header3',
			content: '<h2>我在h2标签里</h2>',
		},
		{
			title : 'header4',
			content: 'body4',
		}
	],
	fn: function(a, b){
		console.log(a, b);
	}
});
```