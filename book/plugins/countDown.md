<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 3.1.7 countDown / pastDown

>说明: 希望给页面上的商品加上倒计时或者从某个时间开始计算到现在的时间,增加用户的积极性

##### 使用及参数说明:
```js
xui.countDown({
	endDate: string, 
	isStop: boolean,
	target: string,
	nodeName: string
});

xui.pastDown({
	pastDate: string, 
	target: string,
	nodeName: string
});
```
* `endDate`表示倒计时的截止日期,**必传**
* `pastDate`表示从哪个时间点开始计算,**必传**
* `target`表示倒计时会显示的元素(必须是类名),**必传** 
* `isStop`表示是否允许出现负数,为`true`的话则到时间了显示`00`,非必传
* `nodeName`表示倒计时的数字会在你自定义的标签里,非必传
* 没有你想要的功能? 快联系我: `xumeng0611@gmail.com`添加吧

### 效果展示

1.这里有一个很简单的例子.
<div class="simple"></div>

<script type="text/javascript">
xui.countDown({
	endDate: '2017/12/31', 
	target: 'simple',
});
</script>

```js
xui.countDown({
	endDate: '2017/12/31',
	target: 'simple',
});
```

2.还可以配置,如果到时间了,全部显示00
<div class="simple_1"></div>

<script type="text/javascript">
xui.countDown({
	endDate: '2017/11/11', 
	isStop: true,
	target: 'simple_1',
});
</script>

```js
xui.countDown({
	endDate: '2017/11/11', 
	isStop: true,
	target: 'simple_1',
});
```

3.可能你又会问了,难道我没法定制返回来的数据了吗? 不,你可以的,你可以传入你想要的标签名
>说明: 数字包裹在标签里,而时分秒则没有

<div class="simple_2"></div>

<script type="text/javascript">
xui.countDown({
	endDate: '2018/12/31', 
	isStop: true,
	target: 'simple_2',
	nodeName: 'span'
});
</script>

```js
xui.countDown({
	endDate: '2018/12/31', 
	isStop: true,
	target: 'simple_2',
	nodeName: 'span'
});
```

4.怀念某个日子? 行啊, 那就设置一个过去的时间, 我来帮你滴答滴答
<div class="simple_3"></div>

<script type="text/javascript">
xui.pastTime({
	pastDate: '2018/10/25', 
	target: 'simple_3',
});
</script>

```js
xui.pastTime({
	pastDate: '2018/10/25',
	target: 'simple_3',
});
```