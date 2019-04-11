<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 3.2.7 sliderBar

>说明: 当用户需要在选择某个值时

##### 使用及参数说明:
```html
<div id="sliderBar" class="xui_slider_bar"></div>
```
```js
new xui.sliderBar({
    id: string,
    currentVal: number,
    max: number,
    unit: string,
    precision: number,
    dragEnd(val){
        console.log(val);
    }
});
```
* 复制好`html`,取一个`id`,然后在你需要用户去加减等操作的地方初始化吧
* `id`表示数字框的`id` **必传**
* `max`表示最大值,默认值为100
* `currentVal`表示默认显示的数字或进度,范围为0-1,默认值为.5
* `unit`表示显示的数字单位,默认值为空
* `precision`表示数字精度,默认值为0
* `dragEnd`表示各个操作后的回调,返回当前选择的数值(包括单位)
* 没有你想要的功能? 快联系我: `me@xumeng.site`添加吧

>说明: 下个版本添加拖拽前,拖拽中的回调,以及最小值

### 效果展示

1.国际惯例, 最简单的滑块就是这个样子的,代码非常精炼
<div id="sliderBar" class="xui_slider_bar"></div>

<style type="text/css">
    #sliderBar{
        margin: 20px 0; 
        width: 200px;
        height: 4px;
    }
</style>

<script type="text/javascript">
new xui.sliderBar({
    id: 'sliderBar',
    dragEnd(val){
        xui.message(val);
    }
});
</script>

```js
new xui.sliderBar({
    id: 'sliderBar',
    dragEnd(val){
        xui.message(val);
    }
});
```

2.同样我也提供了一些自定义的配置项,可以随心所欲的修改
<div id="sliderBar1" class="xui_slider_bar"></div>

<style type="text/css">
    #sliderBar1{
        margin: 20px 0; 
        width: 200px;
        height: 4px;
    }
</style>

<script type="text/javascript">
new xui.sliderBar({
    id: 'sliderBar1',
    currentVal: .3,
    unit: '℃',
    max: 1000,
    precision: 1,
    dragEnd(val){
        xui.message(val);
    }
});
</script>

```js
new xui.sliderBar({
    id: 'sliderBar1',
    currentVal: .5,
    unit: '℃',
    max: 1000,
    precision: 1,
    dragEnd(val){
        xui.message(val);
    }
});
```