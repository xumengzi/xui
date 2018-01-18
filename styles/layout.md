<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# flex布局

>说明: 应用在需要灵活使用各种布局的场景

##### 复制好对应的`html`,添加所需的`class`即可,可拓展性强

### 效果展示

<style type="text/css">
	.content > div{
		text-align: center;
	    height: 80px;
	    color: #fff;
		margin: 10px 0;
	}
	.xui-flex > div:nth-child(2n){
		background: #3b8704;
	}
	.xui-flex > div:nth-child(2n+1){
		background: #4eb900;
	}
</style>

1.均分布局, 每一块的宽度均是一样的. `xui-flex`类名主要控制的是以`flex`布局,`xui-col-1`主要控制的是子元素的宽度1
<div class="content">
	<div class="xui-flex">
		<div class="xui-flex xui-col-1">100%</div>
	</div>
	<div class="xui-flex">
		<div class="xui-flex xui-col-1">50%</div>
		<div class="xui-flex xui-col-1">50%</div>
	</div>
	<div class="xui-flex">
		<div class="xui-flex xui-col-1">33.3%</div>
		<div class="xui-flex xui-col-1">33.3%</div>
		<div class="xui-flex xui-col-1">33.3%</div>
	</div>
</div>


```html
<div class="xui-flex xui-col-24">
	<div class="xui-flex xui-col-1">100%</div>
</div>
<div class="xui-flex">
	<div class="xui-flex xui-col-1">50%</div>
	<div class="xui-flex xui-col-1">50%</div>
</div>
<div class="xui-flex">
	<div class="xui-flex xui-col-1">33.3%</div>
	<div class="xui-flex xui-col-1">33.3%</div>
	<div class="xui-flex xui-col-1">33.3%</div>
</div>
...
```

2.均分布局, 同时需要子元素有一定的间距. PS: 最后一个元素没有边距
<div class="content">
	<div class="xui-flex">
		<div class="xui-flex xui-col-1">100%</div>
	</div>
	<div class="xui-flex xui-flex-10">
		<div class="xui-flex xui-col-1">50%</div>
		<div class="xui-flex xui-col-1">50%</div>
	</div>
	<div class="xui-flex xui-flex-10">
		<div class="xui-flex xui-col-1">33.3%</div>
		<div class="xui-flex xui-col-1">33.3%</div>
		<div class="xui-flex xui-col-1">33.3%</div>
	</div>
</div>

```html
<div class="xui-flex xui-col-24">
	<div class="xui-flex xui-col-1">100%</div>
</div>
<div class="xui-flex">
	<div class="xui-flex xui-col-1">50%</div>
	<div class="xui-flex xui-col-1">50%</div>
</div>
<div class="xui-flex">
	<div class="xui-flex xui-col-1">33.3%</div>
	<div class="xui-flex xui-col-1">33.3%</div>
	<div class="xui-flex xui-col-1">33.3%</div>
</div>
...
```

3.均分布局, 子元素至上而下排列,同时需要子元素有一定的间距. PS: 最后一个元素没有边距
<div class="content">
	<div class="xui-flex">
		<div class="xui-flex xui-col-1">100%</div>
	</div>
	<div class="xui-flex xui-flex-vertical-10 xui-flex-vertical">
		<div class="xui-flex xui-col-1">50%</div>
		<div class="xui-flex xui-col-1">50%</div>
	</div>
	<div class="xui-flex xui-flex-vertical-10 xui-flex-vertical">
		<div class="xui-flex xui-col-1">33.3%</div>
		<div class="xui-flex xui-col-1">33.3%</div>
		<div class="xui-flex xui-col-1">33.3%</div>
	</div>
</div>

```html
<div class="xui-flex">
	<div class="xui-flex xui-col-1">100%</div>
</div>
<div class="xui-flex xui-flex-vertical-10 xui-flex-vertical">
	<div class="xui-flex xui-col-1">50%</div>
	<div class="xui-flex xui-col-1">50%</div>
</div>
<div class="xui-flex xui-flex-vertical-10 xui-flex-vertical">
	<div class="xui-flex xui-col-1">33.3%</div>
	<div class="xui-flex xui-col-1">33.3%</div>
	<div class="xui-flex xui-col-1">33.3%</div>
</div>
...
```