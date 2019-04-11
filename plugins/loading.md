<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 3.1.1 loading

>说明: 用来缓解用户疲劳,提高用户等待积极性.

##### 使用及参数说明:
```js
xui.loading(boolean, string, string1);
```
* `boolean`表示是否显示`loading`,不传或者传`false`,表示删除`loading` **必传**
* `string`表示`loading`显示在这个里面, 也不是全屏`loading`, 默认全屏
* `string1`表示`loading`旁边显示的文案
* 没有你想要的功能? 快联系我: `me@xumeng.site`添加吧


### 效果展示

##### 默认是栅栏式

1.全屏
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

2.指定元素
<button class="xui_btn xui_btn_default" id="show_loading2">试试看</button>

<style type="text/css">
	.inline{
	    height: 200px;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	}
</style>

<div class="inline"></div>

<script type="text/javascript">
document.getElementById('show_loading2').onclick=function(){
	xui.loading(true, '.inline');
	setTimeout(()=>{
		xui.loading(false);
	},3000);
}
</script>

```js
xui.loading(true, '.inline');
```

3.指定元素, 同时配有文字
<button class="xui_btn xui_btn_default" id="show_loading3">试试看</button>

<style type="text/css">
	.inline3{
	    height: 200px;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	}
</style>

<div class="inline3"></div>
<script type="text/javascript">
document.getElementById('show_loading3').onclick=function(){
	xui.loading(true, '.inline3', 'loading...');
	setTimeout(()=>{
		xui.loading(false);
	},3000);
}
</script>

```js
xui.loading(true, '.inline', 'loading...');
```
