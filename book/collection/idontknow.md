<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 4.1.3 i dont know

>路漫漫其修远兮，吾将上下而求索

1.关于`readonly`，很眼熟吧，来看看这种情况

<style>
    .xui_select_readonly[readonly] option{
        display: none;
    }
</style>

>这里是让我费解的，可以看到`select`明明设置了`readonly`属性，但为啥还可以选择某一项呢？

<div>
    切换<code>readonly</code>状态<input id="xui_switch" class="xui_switch" type="checkbox">
    <label for="xui_switch" class="xui_switch_box"></label>
    <div class="xui_content">
        <input type="text" readonly class="xui_input" placeholder="" value="hello world" />
        <select class="xui_select" readonly>
            <option value="1">我也设置了readonly属性</option>
            <option value="2">为啥还能点击，并选择？？</option>
        </select>
    </div>
</div>

>这里可以看到`select`无法选择里面的选项了，为什么呢？关键点是给`select`的`readonly`状态下的`option`设置为隐藏状态即可

```css
.xui_select_readonly[readonly] option{
    display: none;
}
```

<div>
    切换<code>readonly</code>状态<input id="xui_switch1" class="xui_switch" type="checkbox">
    <label for="xui_switch1" class="xui_switch_box"></label>
    <div class="xui_content">
        <input type="text" readonly class="xui_input xui_input1" placeholder="" value="hello world" />
        <select class="xui_select xui_select1 xui_select_readonly" readonly>
            <option value="1">我也设置了readonly属性</option>
            <option value="2">为啥还能点击，并选择？？</option>
        </select>
    </div>
</div>

<script type="text/javascript">
var inp = document.querySelector('.xui_input'),
    inp1 = document.querySelector('.xui_input1'),
    select  = document.querySelector('.xui_select'),
    select1  = document.querySelector('.xui_select1');
document.getElementById('xui_switch').onchange = function(e){
    if(!e.target.checked){
        inp.setAttribute('readonly', true);
        select.setAttribute('readonly', true);
    }else{
        inp.removeAttribute('readonly');
        select.removeAttribute('readonly');
    };
};
document.getElementById('xui_switch1').onchange = function(e){
    if(!e.target.checked){
        inp1.setAttribute('readonly', true);
        select1.setAttribute('readonly', true);
    }else{
        inp1.removeAttribute('readonly');
        select1.removeAttribute('readonly');
    };
};
</script>

2.关于`http`缓存的知识，一直是我不太清楚的点，这里我收藏了饿了么前端[关于`http`缓存的文章](https://zhuanlan.zhihu.com/p/29750583)

3.to be continued