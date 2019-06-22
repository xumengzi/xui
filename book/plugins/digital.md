<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 3.2.6 digital

>说明: 当需要用户通过鼠标或键盘,输入范围内的数值.

##### 使用及参数说明:
```html
<div id="test" class="xui_digital"></div>
```
```js
new xui.digital({
    id: string,
    min: number,
    max: number,
    step: number,
    precision: number,
    fn(val){
        console.log(val);
    }
});
```
* 复制好`html`,取一个`id`,然后在你需要用户去加减等操作的地方初始化吧
* `id`表示数字框的`id` **必传**
* `min`表示最小值,默认值为1
* `max`表示最大值,默认值为1000
* `step`表示每次改变的小数,可为小数,默认值为1
* `precision`表示数字精度,小数时有效(就是理解的保留几位有效数字),默认值为2
* `isLimit`表示是否加上`maxlength`属性,默认值为9
* `isInput`表示是否支持手动输入数字,如果输入大于或者小于临界值则会自动更改为临界值,默认值为`true`
* `fn`表示操作后的回调,返回当前选择或输入的数字
* 如果需要小一些的数字框,可以加上`xui_digital_small`即可
* 没有你想要的功能? 快联系我: `me@xumeng.site`添加吧

### 效果展示

1.仅需要简单配置,即可展示一个数字输入框(该配置是禁止输入),这个是小一些尺寸的
<div id="test" class="xui_digital xui_digital_small"></div>

<script type="text/javascript">
new xui.digital({
    id: 'test',
    min: 1,
    max: 10,
    isInput: false,
    fn(val){
        xui.message(val, 300);
    }
});
</script>

```js
new xui.digital({
    id: 'test',
    min: 1,
    max: 10,
    isInput: false,
    fn(val){
        xui.message(val, 300);
    }
});
```

2.这个是默认大小的输入框,每次更改的步数为.1,这个时候`precision`就显得有必要的
<div id="test1" class="xui_digital"></div>

<script type="text/javascript">
new xui.digital({
    id: 'test1',
    min: .1,
    max: 1,
    step: .1,
    precision: 1,
    fn(val){
        xui.message(val, 300);
    }
});
</script>

```js
new xui.digital({
    id: 'test1',
    min: .1,
    max: 1,
    step: .1,
    precision: 1,
    fn(val){
        xui.message(val, 300);
    }
});
```