<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 3.3.2 digitalScroll

>说明: 当需要给数字添加动画, 提升用户体验.

##### 使用及参数说明:
```html
<div id="string></div>
```
```js
new xui.digital({
    id: string,
    prevVal: number,
    desVal: number,
    step: number,
    interval: number,
    fn: function,
    fnComplete: function,
});
```
* 复制好`html`,取一个`id`,然后在你需要用户去加减等操作的地方初始化吧
* `id`表示数字框的`id` **必传**
* `prevVal`表示动画的初始值
* `desVal`表示动画的最终值
* `step`表示每次改变的幅度
* `interval`表示数字改变的间隔,单位ms
* `fn`表示数字改变的回调,返回当前的数字
* `fnComplete`表示数字最终值的回调,返回最终值
* 没有你想要的功能? 快联系我: `me@xumeng.site`添加吧

### 效果展示

1.来看看,这个简单的例子吧
<button class="xui_btn xui_btn_default" id="digitalScroll">click me</button>
<p id="test"></p>

<script type="text/javascript">
document.getElementById('digitalScroll').addEventListener('click', e=>{
    var test = new xui.digitalscroll({
        id: 'test',
        prevVal: 100,
        step: 100,
        desVal: 999,
        fnComplete(d){
            xui.message(d);
        }
    });
});

</script>

```js
new xui.digitalscroll({
    id: 'test',
    prevVal: 100,
    step: 100,
    desVal: 999,
    fnComplete(d){
        xui.message(d);
    }
})
```
