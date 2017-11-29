<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# tab切换

>说明: 需要展示多个栏目以及节省空间的时间

>使用: 先复制好相应的`html`,取一个独特的`id`,然后初始化`init`就可以使用了,非常方便

### 效果展示


1.先来看看最普通的`tab`切换效果,无需过多配置
<div class="xui_tab" id="simpleTest">
	<ul class="xui_tab_head">
		<li>tab1</li>
		<li>tab2</li>
	</ul>
	<div class="xui_tab_body">
		<div>内容1</div>
		<div>内容2</div>
	</div>
</div>

<script type="text/javascript">
xu.tab({
	id: 'simpleTest'
});
</script>
```html
<div class="xui_tab" id="simpleTest">
	<ul class="xui_tab_head">
		<li>tab1</li>
		<li>tab2</li>
	</ul>
	<div class="xui_tab_body">
		<div>内容1</div>
		<div>内容2</div>
	</div>
</div>
```

```js
xu.tab({
	id: 'simpleTest'
});
```

2.你说:我想指定某一个被选中呢? 嗯,这也是在我的考虑范围内的,只需指定对应的`activeIndex`
<div class="xui_tab" id="normalTest">
	<ul class="xui_tab_head">
		<li>tab1</li>
		<li>tab2</li>
		<li>tab3</li>
	</ul>
	<div class="xui_tab_body">
		<div>内容1</div>
		<div>内容2</div>
		<div>内容3</div>
	</div>
</div>

<script type="text/javascript">
xu.tab({
	id: 'normalTest',
	activeIndex: 1,
});
</script>
```html
<div class="xui_tab" id="normalTest">
	<ul class="xui_tab_head">
		<li>tab1</li>
		<li>tab2</li>
		<li>tab3</li>
	</ul>
	<div class="xui_tab_body">
		<div>内容1</div>
		<div>内容2</div>
		<div>内容3</div>
	</div>
</div>
```

```js
xu.tab({
	id: 'normalTest',
	activeIndex: 1,
});
```

3.最后我知道你肯定会问: 切换了有回调嘛? 当然有的!对应的回调函数是`fn`
<div class="xui_tab" id="hardTest">
	<ul class="xui_tab_head">
		<li>tab1</li>
		<li>tab2</li>
		<li>tab3</li>
		<li>tab4</li>
	</ul>
	<div class="xui_tab_body">
		<div>内容1</div>
		<div>内容2</div>
		<div>内容3</div>
		<div>内容4</div>
	</div>
</div>

<script type="text/javascript">
xu.tab({
	id: 'hardTest',
	activeIndex: 2,
	fn: function(){
		xu.message('看,这就是回调哦!');
	}
});
</script>
```html
<div class="xui_tab" id="hardTest">
	<ul class="xui_tab_head">
		<li>tab1</li>
		<li>tab2</li>
		<li>tab3</li>
		<li>tab4</li>
	</ul>
	<div class="xui_tab_body">
		<div>内容1</div>
		<div>内容2</div>
		<div>内容3</div>
		<div>内容4</div>
	</div>
</div>
```

```js
xu.tab({
	id: 'hardTest',
	activeIndex: 2,
	fn: function(){
		xu.message('看,这就是回调哦!');
	}
});
```