<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# cascader

>说明: 省市区三级联动或者诸如游戏大区等等数据联动

##### 使用及参数说明:
```js
new xui.cascader({
	id: string,
	rep: obj,
	data: array
})
```
* `id`表示三级联动的容器, **必传**
* `rep`表示数据源的`key`, 方便绘制自定义数据源`dom`, **必传**
* `data`表示数据源, 没有格式限制, 只需要在`rep`里面把格式定义好就`ok`了, **必传**
* 准备好一个容器, 然后给一个`id`, 初始化一下即可, 选择的值是保存在这个容器的`data-value`里
* 没有你想要的功能? 快联系我: `me@xumengzi.top`添加吧

### 效果展示

1.这里是一个简单实例, 例子是随便举的,错了不要打我~

>说明: 数据源还是灵活多变的, 我之前用别人写的插件时,就困于数据格式,所以决定自己写一个

<div id="cascader1"></div>

<style type="text/css">
#cascader1{
    display: flex;
	align-items: center;
}
</style>

<script type="text/javascript">
new xui.cascader({
	id: 'cascader1',
	rep: {
		firKey: 'qqq',
		firList: 'b',
		secKey: 'c',
		secList: 'd',
		thiKey: 'gg'
	},
	data: [
		{
			qqq: 'front',
			b: [
				{
					c: 'html',
					d: [
						{
							gg: 'html5',
						},
					],
				},
				{
					c: 'css',
					d: [
						{
							gg: 'css2',
						},
						{
							gg: 'css3',
						}
					],
				},
				{
					c: 'js',
					d: [
						{
							gg: 'es5',
						},
						{
							gg: 'es6',
						},
						{
							gg: 'es7',
						},
						{
							gg: 'es8',
						}
					],
				},
				{
					c: 'vueJs',
				},
			]
		},
		{
			qqq: 'back',
			b: [
				{
					c: '.net',
					d: [
						{
							gg: '.net2',
						},
					],
				},
				{
					c: 'java',
					d: [
						{
							gg: 'j2ee',
						},
						{
							gg: 'others',
						},
					],
				},
			]
		},
	]
})
</script>

```js
new xui.cascader({
	id: 'cascader1',
	rep: {
		firKey: 'qqq',
		firList: 'b',
		secKey: 'c',
		secList: 'd',
		thiKey: 'gg'
	},
	data: [
		{
			qqq: 'front',
			b: [
				{
					c: 'html',
					d: [
						{
							gg: 'html5',
						},
					],
				},
				{
					c: 'css',
					d: [
						{
							gg: 'css2',
						},
						{
							gg: 'css3',
						}
					],
				},
				{
					c: 'js',
					d: [
						{
							gg: 'es5',
						},
						{
							gg: 'es6',
						},
						{
							gg: 'es7',
						},
						{
							gg: 'es8',
						}
					],
				},
				{
					c: 'vueJs',
				},
			]
		},
		{
			qqq: 'back',
			b: [
				{
					c: '.net',
					d: [
						{
							gg: '.net2',
						},
					],
				},
				{
					c: 'java',
					d: [
						{
							gg: 'j2ee',
						},
						{
							gg: 'others',
						},
					],
				},
			]
		},
	]
})
```