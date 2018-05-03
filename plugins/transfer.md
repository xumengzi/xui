<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 3.1.19 transfer

>说明: 用直观的方式在两栏中移动元素，完成选择行为

##### 使用及参数说明:
```html
<div id="transfer" class="xui-flex xui-transfer"></div>
```

```js
new xui.transfer({
	id: string,
	prevList: array,
	lastList: array,
	fn(data){
		{
			leftList: [
				{
					value: "javascript",
					disabled: "false"
				}
			],
			rightList: [
				{
					value: "todo",
					disabled: "false"
				}
			]
		}
	}
});
```
* `id`表示雪花容器,**必传**
* `prevList`表示穿梭框左边显示的数据(原始数据)
* `lastList`表示穿梭框右边显示的数据(目标数据)
* `fn`表示选择后的回调,返回一个对象包含原始数据和目标数据
* 没有你想要的功能? 快联系我: `me@xumengzi.top`添加吧

### 效果展示

1.常规惯例,我们实现一个最简单的穿梭框
<div id="transfer" class="xui-flex xui-transfer"></div>

<script type="text/javascript">
new xui.transfer({
	id: 'transfer',
	prevList: [
		{
			value: 'vue',
			disabled: "false",
		},
		{
			value: 'react',
			disabled: "false",
		},
		{
			value: 'angular',
			disabled: "false",
		},
	],
	lastList: [
		{
			value: 'todo',
			disabled: "false",
		}
	]
});
</script>

```html
<div id="transfer" class="xui-flex xui-transfer"></div>
```

```js
new xui.transfer({
	id: 'transfer',
	prevList: [
		{
			value: 'vue',
			disabled: "false",
		},
		{
			value: 'react',
			disabled: "false",
		},
		{
			value: 'angular',
			disabled: "false",
		},
	],
	lastList: [
		{
			value: 'todo',
			disabled: "false",
		}
	]
});
```

2.接下来,我们来配置一些其他的元素,这里我们新增了选择后的回调以及某些项不可选.
<div id="transfer1" class="xui-flex xui-transfer"></div>
<script type="text/javascript">
new xui.transfer({
	id: 'transfer1',
	prevList: [
		{
			value: 'javascript and something else',
			disabled: "false",
		},
		{
			value: 'vue',
			disabled: "false",
		},
		{
			value: 'react',
			disabled: "true",
		},
		{
			value: 'angular',
			disabled: "false",
		},
		{
			value: 'es6',
			disabled: "false",
		},
		{
			value: 'es7',
			disabled: "true",
		},
		{
			value: 'es8',
			disabled: "false",
		},
	],
	lastList: [
		{
			value: 'todo',
			disabled: "false",
		},
		{
			value: 'todo1',
			disabled: "true",
		}
	],
	fn: function(data){
		console.log(data);
	}
});
</script>

```html
<div id="transfer1" class="xui-flex xui-transfer"></div>
```

```js
new xui.transfer({
	id: 'transfer1',
	prevList: [
		{
			value: 'javascript and something else',
			disabled: "false",
		},
		{
			value: 'vue',
			disabled: "false",
		},
		{
			value: 'react',
			disabled: "true",
		},
		{
			value: 'angular',
			disabled: "false",
		},
		{
			value: 'es6',
			disabled: "false",
		},
		{
			value: 'es7',
			disabled: "true",
		},
		{
			value: 'es8',
			disabled: "false",
		},
	],
	lastList: [
		{
			value: 'todo',
			disabled: "false",
		},
		{
			value: 'todo1',
			disabled: "true",
		}
	],
	fn: function(data){
		console.log(data);
	}
});
```