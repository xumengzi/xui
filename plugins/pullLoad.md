<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 3.3.1 pullLoad

>说明: 方便用户快速完成加载刷新,  增强用户体验

##### 使用及参数说明:
```html
<div id="pullLoad" class="xui_pull_load">
	<div class="xui_pull_content">下拉加载</div>
</div>
```

```js
let load = new xui.pullLoad({
	id: string,
	loading: string,
	maxScrollHeight: number,
	activeScrollHeight: number,
	fn: function(){
		setTimeout(() =>{
			xui.message('异步数据请求成功');
			load.ele.innerHTML = Math.PI.toString().substr(0, Math.random() * 6 + 4);
			load.finished();
		},2000);
	}
});
```
* `id`表示下拉加载容器,**必传**
* `loading`表示容器下拉后, loading的文案, 支持文字和图片
* `maxScrollHeight`表示允许下拉的最大高度
* `activeScrollHeight`表示触发回调的最大高度, 不大于`maxScrollHeight`
* `fn`表示回调, 可以在这里去异步请求数据, 然后调用`ished方法`
* 没有你想要的功能? 快联系我: `me@xumengzi.top`添加吧

### 效果展示

1.我们先来看看一个最基本的例子,用最少的代码实现最多的功能.
<div id="pullLoad" class="xui_pull_load">
	<div class="xui_pull_content">下拉加载</div>
</div>

<style type="text/css">
	#pullLoad,#pullLoad1{
		width: 200px;
		height: 300px;
		margin-bottom: 100px;
		background: antiquewhite;
		text-align: center;
	    color: brown;
	}
	.xui_pull_content{
	    background: beige;
	    display: flex;
        align-items: center;
		justify-content: center;
	}
</style>

<script type="text/javascript">
let load = new xui.pullLoad({
	id: 'pullLoad',
	fn: function(){
		setTimeout(() =>{
			xui.message('异步数据请求成功');
			load.ele.innerHTML = Math.PI.toString().substr(0, Math.random() * 6 + 4);
			load.finished();
		},2000);
	}
});
</script>

```html
<div id="pullLoad" class="xui_pull_load">
	<div class="xui_pull_content">下拉加载</div>
</div>```

```js
let load = new xui.pullLoad({
	id: 'pullLoad',
	fn: function(){
		setTimeout(() =>{
			xui.message('异步数据请求成功');
			load.ele.innerHTML = Math.PI.toString().substr(0, Math.random() * 6 + 4);
			load.finished();
		},2000);
	}
});
```

2.这里我们配置了更多参数,欢迎体验
<div id="pullLoad1" class="xui_pull_load">
	<div class="xui_pull_content">下拉加载</div>
</div>

<script type="text/javascript">
let load1 = new xui.pullLoad({
	id: 'pullLoad1',
	loading: '<img src="http://xumengzi.top/images/loading.gif" />',
	maxScrollHeight: 100,
	activeScrollHeight: 80,
	fn: function(){
		setTimeout(() =>{
			xui.message('异步数据请求成功');
			load1.ele.innerHTML = Math.round(Math.random() * 1000);
			load1.finished();
		},2000);
	}
});
</script>

```html
<div id="pullLoad1" class="xui_pull_load">
	<div class="xui_pull_content">下拉加载</div>
</div>```

```js
let load1 = new xui.pullLoad({
	id: 'pullLoad1',
	loading: '<img src="http://xumengzi.top/images/loading.gif" />',
	maxScrollHeight: 60,
	activeScrollHeight: 50,
	fn: function(){
		setTimeout(() =>{
			xui.message('异步数据请求成功');
			load1.ele.innerHTML = Math.round(Math.random() * 1000);
			load1.finished();
		},2000);
	}
});
```
