<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 3.1.10 slider

>说明: 凸显网站特色以及展示多张图片等场景需要

##### 使用及参数说明:
```html
<div id="mySlider"></div>
```
```js
new xui.slider({
	id: 'mySlider',
	duration: 2000,
	animation: '.5s linear',
	isShowSwitch: true,
	isShowDot: true,
	imgList: [
		{
			link: 'http://xumengzi.top/',
			img: 'http://img.infinitynewtab.com/wallpaper/1111.jpg',
		},
		{
			link: 'https://www.baidu.com/',
			img: 'http://img.infinitynewtab.com/wallpaper/1234.jpg',
		},
		{
			link: 'https://jarveniv.gitbooks.io/xui/content/',
			img: 'http://img.infinitynewtab.com/wallpaper/2345.jpg',
		},
	],
	fn: function(index){
		console.log('mySlider '+index);
	}
});
```
* `id`表示幻灯片的`id`,**必传**
* `duration`表示每一张幻灯片显示的时间,
* `animation`表示幻灯片更换的时间,动画等,非必传
* `imgList`表示幻灯片的图片和链接等信息,**必传**
* `isShowSwitch`表示是否显示左右两边切换按钮
* `isShowDot`表示是否显示左下角圆点
* `fn`表示幻灯片更换的回调,会返回当前幻灯片的`index`,非必传
* **一定要给你的容器一个`width`和`height`**
* 没有你想要的功能? 快联系我: `me@xumengzi.top`添加吧

### 效果展示

1.这里有一个很简单的例子.
<style type="text/css">
	#mySlider,#mySlider1{
	    width: 770px;
		height: 300px;
	}
</style>

<div id="mySlider1"></div>

<script type="text/javascript">
new xui.slider({
	id: 'mySlider1',
	duration: 3000,
	animation: '.5s linear',
	isShowSwitch: true,
	isShowDot: true,
	imgList: [
		{
			link: 'http://xumengzi.top/',
			img: 'http://img.infinitynewtab.com/wallpaper/1111.jpg',
		},
		{
			link: 'https://www.baidu.com/',
			img: 'http://img.infinitynewtab.com/wallpaper/1234.jpg',
		},
		{
			link: 'https://jarveniv.gitbooks.io/xui/content/',
			img: 'http://img.infinitynewtab.com/wallpaper/2345.jpg',
		},
	],
	fn: function(index){
		console.log('mySlider1 '+index);
	}
});
</script>

```js
new xui.slider({
	id: 'mySlider1',
	duration: 3000,
	animation: '.5s linear',
	isShowSwitch: true,
	isShowDot: true,
	imgList: [
		{
			link: 'http://xumengzi.top/',
			img: 'http://img.infinitynewtab.com/wallpaper/1111.jpg',
		},
		{
			link: 'https://www.baidu.com/',
			img: 'http://img.infinitynewtab.com/wallpaper/1234.jpg',
		},
		{
			link: 'https://jarveniv.gitbooks.io/xui/content/',
			img: 'http://img.infinitynewtab.com/wallpaper/2345.jpg',
		},
	],
	fn: function(index){
		console.log('mySlider1 '+index);
	}
});
```