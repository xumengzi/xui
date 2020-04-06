<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 3.3.4 backToTop

>说明: 给用户提供一个快速返回顶部的便捷通道

##### 使用及参数说明:
```js
xui.backToTop({
	id: string,
	target: string || array,
	cusClass: string,
	title: string,
	step: number,
	right: string,
	bottom: string,
	fn: callback,
});
```
* 传入相关参数, 初始化即可使用
* `id`表示返回顶部组件的`id`
* `target`表示需要返回顶部的目标元素, 默认为`body`, 如果滚动条不在`body`上就设置, 如果有多个用数组展示(响应式布局里会出现)
* `cusClass`表示返回顶部组件的样式名
* `title`表示返回顶部的文案展示, 支持传标签, 默认为`返回顶部`文案
* `right`表示返回顶部的位置, 支持`%`, `px`
* `bottom`表示返回顶部的位置, 支持`%`, `px`
* `step`表示返回顶部的速度, 数值越大返回越快, 默认值`100`
* `fn`表示返回顶部的回调, 返回到了顶部时触发
* 没有你想要的功能? 快联系我: `xumeng0611@gmail.com`添加吧

### 效果展示

1.看一看最简单的配置, 初始化即可

<script type="text/javascript">
// gitbook 滚动条在不同的位置,坑爹
new xui.backToTop({
	target: ['book-body', 'body-inner'],
});
</script>

```js
new xui.backToTop({
	target: ['book-body', 'body-inner'],
});
```

2.我们提供了丰富的配置, 可以挨个试试

<script type="text/javascript">
new xui.backToTop({
	id: 'xumeng',
	target: ['book-body', 'body-inner'],
	cusClass: "custom-class",
	right: '50px',
	title: '<span style="color: red">返<br/>回<br/>顶<br/>部</span>',
	step: 50,
	bottom: '200px',
	fn(){
		xui.message('finished');
	}
});
</script>

```js
new xui.backToTop({
	id: 'xumeng',
	target: ['book-body', 'body-inner'],
	cusClass: "custom-class",
	right: '50px',
	title: '<span style="color: red">返<br/>回<br/>顶<br/>部</span>',
	step: 50,
	bottom: '200px',
	fn(){
		xui.message('finished');
	}
});
```

*为了页面有滚动条,特地摘录了一段话*

>寓形宇内复几时，曷不委心任去留？

>胡为乎遑遑欲何之？

>富贵非吾愿，帝乡不可期。

>怀良辰以孤往，或植杖而耘耔。

>登东皋以舒啸，临清流而赋诗。

>聊乘化以归尽，乐夫天命复奚疑！

>——节选自陶渊  《归去来兮辞》