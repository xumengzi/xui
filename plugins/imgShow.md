<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# imgShow

>说明: 用来查看大图,给用户极致体验.


### 效果展示

##### 点击图片即可放大,并支持旋转缩放等等.仅仅传入对应的图片`url`即可.

1.点击图片查看大图
<div>
	<img id="showImg" style="width: 300px" src="http://10.0.4.165:8006/upload/file//b37e4a64afca08c86fa27117f95103e2.jpg">
</div>

<script type="text/javascript">
document.getElementById('showImg').onclick = function(e){
	xu.showBigImg(e.target.src);
};
</script>

```js
xu.showBigImg(url); //传入图片url即可预览
```

2.可以配置相关操作选项,第二个参数为`true`时,可下载该图片.
>说明: 关于下载图片相关知识, 请戳[HTML a download 属性](http://www.w3school.com.cn/tags/att_a_download.asp)
<div>
	<img id="showImg1" style="width: 300px" src="http://10.0.4.165:8006/upload/file//b37e4a64afca08c86fa27117f95103e2.jpg">
</div>

<script type="text/javascript">
document.getElementById('showImg1').onclick = function(e){
	xu.showBigImg(e.target.src, true);
};
</script>

```js
xu.showBigImg(url, true); //传入图片url即可预览, 第二个参数为true可下载图片
```

3.完整的配置
```js
//第一个图片地址参数必传,第二个参数`Boolean`提供下载链接非必传
xu.showBigImg(url, Boolean);
```