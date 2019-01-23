<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 3.1.4 imgShow

>说明: 用来查看大图,给用户极致体验.并支持放大缩小,旋转,下载操作.

##### 使用及参数说明:
```js
xui.showImg(src, string);
```
* 给图片一个点击事件(或者别的),然后调用方法即可查看大图
* `src`表示图片的`src` **必传**
* `string`表示图片处在**同域**下时下载的文件名
* 没有你想要的功能? 快联系我: `me@xumengzi.top`添加吧

>不是**同域**下，不同浏览器有不同的操作, 有的会下载, 有的则会新标签打开查看图片

### 效果展示

##### 点击图片即可放大,并支持旋转缩放等等.仅仅传入对应的图片`url`即可.

1.点击图片查看大图
<div>
	<img id="showImg" style="width: 300px" src="http://img.infinitynewtab.com/wallpaper/2811.jpg">
</div>

<script type="text/javascript">
document.getElementById('showImg').onclick = function(e){
	xui.showImg(e.target.src);
};
</script>

```js
xui.showImg(url); //传入图片url即可预览
```

2.可以配置相关操作选项,第二个参数为`string`时,可下载该图片.
>说明: 关于下载图片相关知识, 请戳[a download 属性](http://www.w3school.com.cn/tags/att_a_download.asp)

<div>
	<div>下面这张图片来自网上,是跨域的图片,你试图修改下载文件名,但是失败了</div>
	<img id="showImg1" style="width: 300px" src="http://img.infinitynewtab.com/wallpaper/2811.jpg">
	<div>下面这张图片来自本地,是同域,所以可以更改下载文件名</div>
	<img id="showImg2" style="width: 300px" src="../img/test.jpg">
</div>

<script type="text/javascript">
document.getElementById('showImg1').onclick = function(e){
	xui.showImg(e.target.src, 'hello');
};
document.getElementById('showImg2').onclick = function(e){
	xui.showImg(e.target.src, 'hello');
};
</script>

```js
xui.showImg(url, 'hello'); //传入图片url即可预览, 第二个参数为string可下载图片
```