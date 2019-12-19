<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 3.2.1 scrollLoad

>说明: 用于移动端滑动加载数据, 当然pc端也是可以的

##### 使用及参数说明:
```js
var test = new xui.scroll();
test.onscroll = function(height){
	if (height == 0) {
		xui.loading(true, '.loading');
		setTimeout(() => {
			xui.loading(false);
		},2000);
	};
};
```
* `id`是指希望滚动加载的元素, 不传是监听`window`, 也就是整个窗口的滚动事件
* 首先`new`一个`scroll`, 然后给它写一个`onscroll`函数, 传的参数就是当前滚动时距离底部的距离
* 你可以在`height`为0 时去请求下一页的数据, 然后在渲染出来, 删除掉`loading`即可
* `loading`的第二个参数可以指定在哪个容器里, 用于下拉加载在适合不过了
* `loading`可以是单独一个容器, 也可以直接追加到渲染列表里. 到时候记得删掉就好了
* 没有你想要的功能? 快联系我: `xumeng0611@gmail.com`添加吧

### 效果展示
1.让我们先滚动加载的例子吧, 滑动下面这段文字看看吧
<style type="text/css">
	.scroll_con{
		/*width: 400px;*/
	}
	.loading{
		position: relative;
	}
	.poem{
		height: 8em;
		overflow: auto;
		position: relative;
	}
	.scroll_con .loading{
		width: 100%;
		position: relative;
	}
</style>
<div class="scroll_con">
	<div class="poem" id="example">
		<p>寓形宇内复几时，曷不委心任去留？</p>
		<p>胡为乎遑遑欲何之？</p>
		<p>富贵非吾愿，帝乡不可期。</p>
		<p>怀良辰以孤往，或植杖而耘耔。</p>
		<p>登东皋以舒啸，临清流而赋诗。</p>
		<p>聊乘化以归尽，乐夫天命复奚疑！</p>
		<p>——节选自陶渊  《归去来兮辞》</p>
	</div>
	<div class="loading"></div>
</div>

<script type="text/javascript">
var test = new xui.scroll({
	id: 'example'
});
test.onscroll = function(height){
	if (height == 0) {
		xui.loading(true, '.loading');
		setTimeout(() => {
			xui.loading(false);
		},3000);
	};
};
test.init();
</script>

```js
var test = new xui.scroll({
	id: 'example'
});
test.onscroll = function(height){
	if (height == 0) {
		xui.loading(true, '.loading');
		setTimeout(() => {
			xui.loading(false);
		},2000);
	};
};
test.init();
```