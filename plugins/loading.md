<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# loading

>说明: 用来缓解用户疲劳,提高用户等待积极性.

>说明:参数修改, 需要重新撰写文档 201/12/22

##### 使用及参数说明:
```js
xui.loading(boolean, number);
```
* `boolean`表示是否显示`loading`,不传或者传`false`,表示删除`loading`
* `number`表示显示哪一种`loading`效果, 目前支持:栅栏式,圆圈状,圆点状. 默认是栅栏式
* 没有你想要的功能? 快联系我: `me@xumengzi.top`添加吧


### 效果展示

##### 默认是栅栏式

1.栅栏式
<button class="xui_btn xui_btn_default" id="show_loading1">试试看</button>

<script type="text/javascript">
document.getElementById('show_loading1').onclick=function(){
	xui.loading(true);
	setTimeout(()=>{
		xui.loading(false);
	},3000);
}
</script>

```js
xui.loading(true);
```

2.圆圈状
<button class="xui_btn xui_btn_default" id="show_loading2">试试看</button>

<script type="text/javascript">
document.getElementById('show_loading2').onclick=function(){
	xui.loading(true, 1);
	setTimeout(()=>{
		xui.loading(false);
	},3000);
}
</script>

```js
xui.loading(true, 2);
```

3.圆点状
<button class="xui_btn xui_btn_default" id="show_loading3">试试看</button>

<script type="text/javascript">
document.getElementById('show_loading3').onclick=function(){
	xui.loading(true, 2);
	setTimeout(()=>{
		xui.loading(false);
	},3000);
}
</script>

```js
xui.loading(true, 3);
```