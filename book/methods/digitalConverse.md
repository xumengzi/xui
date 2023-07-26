<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 2.1.4 digitalConverse

>说明: 在需要对数字进行进制转换的时候

##### 使用及参数说明:
```js
xui.digConverse(number, dicimal);
```
* `number`表示需要进行的数字 **必须**
* `dicimal`表示需要对数字进行转换的进制, 默认为二进制
* 目前支持十进制转换为二进制, 八进制, 后续会添加更多功能
* 没有你想要的功能? 快联系我: `xumeng0611@gmail.com`添加吧

1.试着写写看
<div class="xui_item">
    <label>write something: </label>
    <div class="xui_content">
        <input type="text" id="digital" value=10 class="xui_input" placeholder="数字" />
        <input type="text" id="dicimal" value=2 class="xui_input" placeholder="进制" />
        <button class="xui_btn xui_btn_default" id="count">count</button>
        <span id="show"></span>
    </div>
</div>

<script type="text/javascript">
	var btn = document.getElementById('count');
	btn.onclick = function(){
		var digital = document.getElementById('digital').value,
			dicimal = document.getElementById('dicimal').value;
		document.getElementById('show').innerHTML = xui.digConverse(digital, dicimal);
	}
</script>

```js
var btn = document.getElementById('count');
btn.onclick = function(){
	var digital = document.getElementById('digital').value,
		dicimal = document.getElementById('dicimal').value;
	document.getElementById('show').innerHTML = xui.digConverse(digital, dicimal);
}
```