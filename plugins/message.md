<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# message

>说明: 用来提示用户,具体行为是出现一个`message`,然后一段时间后消失


### 效果展示


1.我们可以就配置一些显示的文字,默认时间为1s.
<button class="xui_btn xui_btn_default" id="show_message">1s后消失</button>

<script type="text/javascript">
document.getElementById('show_message').onclick=function(){
	xui.message('hello, world');
}
</script>

```js
xui.message('hello, world');
```

2.当然,我们也可以修改一下显示并消失的时间
<button class="xui_btn xui_btn_default" id="show_message1">2s后消失</button>

<script type="text/javascript">
document.getElementById('show_message1').onclick=function(){
	xui.message('hello, world', 2000);
}
</script>

```js
xui.message('hello, world', 2000);
```
3.如果你想文字显示完了,加一个回调,我们也是支持的哦~
<button class="xui_btn xui_btn_default" id="show_message2">这里会有回调哦~</button>

<script type="text/javascript">
document.getElementById('show_message2').onclick=function(){
	xui.message('hello, world', 2000, function(){console.log('look, this is callback!');});
}
</script>

```js
xui.message(
	'hello, world', 
	2000, 
	function(){
		console.log('look, this is callback!');
	}
);
```

4.完整的配置
```js
//words必须(默认1s), time和callback非必须
xui.message(words, time, callback);
```