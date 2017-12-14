<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 插件

>有人说,如果有现成的轮子,那就没必要花时间再去造一个.

##### 对我来说,有时候造轮子可以发现不一样的境界.因为当我在造轮子的时候我会想:别人到底需要什么样的轮子呢?
##### 我一直在思考轮子的API是否友好,是否容易扩展,是否能够做到0bug,高兼容性呢?
##### 当我真正的去造一个轮子的时候,我发现其实还是蛮难的,可谓众口难调.不过又说回来,造了一个大家都喜欢的轮子,难道你就没有成就感吗? 哈哈!

1.这里我尝试写了一个方法,主要是用在诸如异步请求,提交表单时的loading效果.
```js
xui.loading(true); //loading
xui.loading(false); //loading关闭
```