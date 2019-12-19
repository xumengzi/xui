<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 3.2.7 sliderBar

>说明: 方便用户选择范围内的某个值.

##### 使用及参数说明:
```html
<div id="sliderBar" class="xui_slider_bar"></div>
```
```js
1.ES5时代
let slider = new xui.sliderBar({
    id: string,
    currentVal: number,
    initVal: number,
    max: number,
    unit: string,
    precision: number,
    disabled: bool,
    dragMove(val){
        console.log(val)
    },
    dragEnd(val){
        console.log(val);
    }
});

2.ES6时代
import sliderBar from '../packages/sliderBar';
let slider = new sliderBar({
    id: string,
    currentVal: number,
    initVal: number,
    max: number,
    unit: string,
    precision: number,
    disabled: bool,
    dragMove(val){
        console.log(val)
    },
    dragEnd(val){
        console.log(val);
    }
});

slider.getCurrentvalue();
slider.setCurrentValue(cur, total);
```
* 复制好`html`,取一个`id`,然后在你需要用户去加减等操作的地方初始化吧
* `id`表示数字框的`id` **必传**
* `max`表示最大值,默认值为100
* `currentVal`表示默认显示的数字或进度,范围为0-1,默认值为.5
* `initVal`表示默认展示的数字
* `unit`表示显示的数字单位,默认值为空
* `precision`表示数字精度,默认值为0
* `disabled`表示是否禁止掉滑动输入框，禁止的`style`是`xui_slider_disabled`
* `dragMove`表示滑块滑动的回调,返回当前选择的数值(包括单位)
* `dragEnd`表示滑块结束滑动的回调,返回当前选择的数值(包括单位)
* `getCurrentvalue`实例上的方法，返回当前选择的值
* `setCurrentValue`实例上的方法, 设置当前滑动选择框的值，需要传入当前设置的值和总值
* 没有你想要的功能? 快联系我: `xumeng0611@gmail.com`添加吧

### 效果展示

1.国际惯例, 最简单的滑块就是这个样子的,代码非常精炼，但是功能却不少
<div>
    <div id="sliderBar" class="xui_slider_bar"></div>
    <button class="xui_btn xui_btn_default" id="getValue">获取当前值</button>
    <button class="xui_btn xui_btn_default" id="setValue">随机设置当前值</button>
</div>

<style type="text/css">
    #sliderBar{
        margin: 20px 0; 
        width: 200px;
        height: 4px;
    }
</style>

<script type="text/javascript">
var test = new xui.sliderBar({
    id: 'sliderBar',
    dragMove(val){
        console.log(val)
    },
    dragEnd(val){
        xui.message(val);
    }
});
document.getElementById('getValue').addEventListener('click', function(){
    xui.message(test.getCurrentvalue());
});
document.getElementById('setValue').addEventListener('click', function(){
    let ran = Math.round(Math.random() * 100);
    test.setCurrentValue(ran, 100);
});
</script>

```js
var test = new xui.sliderBar({
    id: 'sliderBar',
    dragMove(val){
        console.log(val)
    },
    dragEnd(val){
        xui.message(val);
    }
});
document.getElementById('getValue').addEventListener('click', function(){
    xui.message(test.getCurrentvalue());
});
document.getElementById('setValue').addEventListener('click', function(){
    let ran = Math.round(Math.random() * 100);
    test.setCurrentValue(ran, 100);
});
```

2.同样我也提供了一些自定义的配置项，希望可以满足各种需求
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