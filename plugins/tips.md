<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# tips

>说明: 用来提示用户,具体行为是出现一个`tips`,然后1s(可设置)后消失


### 效果展示

##### 默认是1s后消失


<button class="xui_btn xui_btn_default" id="show_tips">试试看</button>

<script type="text/javascript">
document.getElementById('show_tips').onclick=function(){
	xu.tips('hello, world', 2000);
}
</script>

```js
xu.tips('hello, world', 2000);
```