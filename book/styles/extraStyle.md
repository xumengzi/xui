<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 1.1.3 其他样式

>说明: 用来为用户更多信息,`hover`时出现.

>`hover`的弹框层级为`10000`,需要注意的是别让其他元素遮挡了.

##### 使用的时候只需增加对应的`class`和用来展示的文案`data-xui-tip`,其他的事情由我来做好了.
##### 默认在上边的`tips`

<p class="xui_tips" data-xui-tip="默认信息是展示在元素上边的">hover me</p>

```html
<p class="xui_tips" data-xui-tip="默认信息是展示在元素上边的">hover me</p>
```

##### 当然这些`tips`也可以配置在元素下边

<p class="xui_tips_bottom" data-xui-tip="看,也可以配置在我下边展示吧?">hover me</p>

```html
<p class="xui_tips_bottom" data-xui-tip="看,也可以配置在我下边展示吧?">hover me</p>
```