<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 3.2.8 copyToClipBoard

>说明: 方便用户复制某些内容,并给出友好提示

##### 使用及参数说明:
```js
xui.copyToClipBoard(string, tips)
```
* `string`表示需要复制的文案,传入文案即可完成复制,**必传**
* `tips`表示复制成功后显示的文案, 默认提示信息为`复制成功`
* 没有你想要的功能? 快联系我: `me@xumeng.site`添加吧

>说明: 复制采用的是`document.execCommand`,对于这个`api`是存在兼容性的. [详情请戳caniuse](https://caniuse.com/#search=execCommand)

>提示: 目前来说,对于PC端兼容性还不错,可以使用.手机端则需要注意一下低版本浏览器的兼容问题

### 效果展示

1.让我们来看一个简单的复制例子
<div>
    <input type="text" class="xui_input" value="hello, world" id="copyContent1" name="">
    <button class="xui_btn xui_btn_default" id="copy1">复制</button>
</div>

<script type="text/javascript">
document.getElementById('copy1').onclick = function(){
    let val = document.getElementById('copyContent1').value;
    xui.copyToClipBoard(val);
}
</script>

```js
xui.copyToClipBoard(val);
```

2.当然你可以自定义复制成功的提示信息
<div>
    <input type="text" class="xui_input" value="vuejs" id="copyContent2" name="">
    <button class="xui_btn xui_btn_default" id="copy2">复制</button>
</div>

<script type="text/javascript">
document.getElementById('copy2').onclick = function(){
    let val = document.getElementById('copyContent2').value;
    xui.copyToClipBoard(val, 'copyed');
}
</script>

```js
xui.copyToClipBoard(val, 'copyed');
```