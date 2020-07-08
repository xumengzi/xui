<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 3.3.3 animateImgShow

>说明: 用来查看大图, 添加了一些动画, 并提供了多重配置项

##### 使用及参数说明:
```js
xui.showAnimatedImg({
	img: src,
	divide: number,
	delay: string,
	animatedStyle: string,
});
```
* 给图片一个点击事件(或者别的),然后调用方法即可查看大图
* `img`表示图片的`src` **必传**
* `divide`表示图片分为几块展示, 默认4, 可以设置为9
* `delay`表示图片分割之后的动画延时
* `animatedStyle`表示图片打开之后的动画效果, 可选`translate`, `rotate`, `skew`, `scale`
* 没有你想要的功能? 快联系我: `xumeng0611@gmail.com`添加吧


### 效果展示

##### 点击图片即可放大,并支持旋转缩放等等

1.看一看最简单的配置, 传入图片即可
<div>
	<img id="showImg" style="width: 300px" src="http://img.infinitynewtab.com/wallpaper/2811.jpg">
</div>

<script type="text/javascript">
document.getElementById('showImg').onclick = function(e){
	xui.showAnimatedImg({
		img: e.target,
	});
};
</script>

```js
xui.showAnimatedImg({
	img: e.target,
});
```

2.我们还可以给图片设置更多属性, 选择动画, 然后点击图片

选择动画:
<select class="xui_select" id="style">
	<option value="translate">translate</option>
	<option value="rotate">rotate</option>
	<option value="skew">skew</option>
	<option value="scale">scale</option>
</select>

选择分割数量:
<select class="xui_select" id="count">
	<option value="4">4</option>
	<option value="9">9</option>
</select>

选择延时delay:
<select class="xui_select" id="delay">
	<option value="0.1">0.1s</option>
	<option value="0.2">0.2s</option>
	<option value="0.3">0.3s</option>
	<option value="0.4">0.4s</option>
	<option value="0.5">0.5s</option>
</select>

<div>
	<img id="showImg1" style="width: 300px;margin-top: 20px;" src="http://img.infinitynewtab.com/wallpaper/2811.jpg">
</div>

<script type="text/javascript">
let imgExample = document.getElementById('showImg1')
xui.dropDown({
	id: 'style',
	getValue(){
		let str = `http://img.infinitynewtab.com/wallpaper/${xui.randomNum(1, 2000)}.jpg`;
		imgExample.src = str;
	}
});

xui.dropDown({
	id: 'count',
	getValue(){
		let str = `http://img.infinitynewtab.com/wallpaper/${xui.randomNum(1, 2000)}.jpg`;
		imgExample.src = str;
	}
});

xui.dropDown({
	id: 'delay',
	getValue(){
		let str = `http://img.infinitynewtab.com/wallpaper/${xui.randomNum(1, 2000)}.jpg`;
		imgExample.src = str;
	}
});

imgExample.onclick = function(e){
	var style = document.getElementById('style').value;
	var count = document.getElementById('count').value;
	var delay = document.getElementById('delay').value;
	xui.showAnimatedImg({
		img: e.target,
		divide: count,
		delay: delay,
		animatedStyle: style,
	});
};
</script>

```js
xui.showAnimatedImg({
	img: e.target,
	divide: 9,
	delay: .2,
	animatedStyle: 'scale',
});
```