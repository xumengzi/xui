<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 2.1.2 throttle

>说明: 在某个规定的时间内只执行一次任务

##### 使用及参数说明:
```js
xui.throttle(fn, await, leading);
```
* `fn`表示需要进行节流的函数
* `await`表示规定的时间, 默认为300ms
* `leading`表示是否首先触发, 默认为触发, 设置为false后, 进入不触发, 等待`await`后触发, 离开后`await`触发
* 没有你想要的功能? 快联系我: `me@xumengzi.top`添加吧

1.这里没有使用节流函数, 可以看到鼠标移动的越快, 计数跑的越快,
这个时候看上去没有问题, 但是当我们在函数里进行了一些复杂操作, 比如异步调用等,
此时浏览器肯定会变卡
<div class="xui_test" id="throttle"></div>

<style type="text/css">
.xui_test{
    width: 100%;
	height: 200px;
	margin: 20px auto;
	background: antiquewhite;
    color: brown;
    display: flex;
    align-items: center;
	justify-content: center;
}
</style>

<script type="text/javascript">
	var eg = document.getElementById('throttle'),
		NUM = 0;
	eg.addEventListener('mousemove', function(){
		NUM++;
		eg.innerHTML = 'move ' + NUM + ' times';
	});
</script>

```js
var eg = document.getElementById('throttle'),
	NUM = 0;
eg.addEventListener('mousemove', function(){
	NUM++;
	eg.innerHTML = 'move ' + NUM + ' times';
});
```

2.这个时候节流函数就派上用场了, 此时延时为500ms, 意思是不管你移动的多块,500ms内我就是只执行一次
<div class="xui_test" id="throttle1"></div>

<script type="text/javascript">
	var tar = document.getElementById('throttle1'),
		NUM1 = 0;
	tar.addEventListener('mousemove', 
		xui.throttle(function(e){
			NUM1++;
			e.target.innerHTML = 'move ' + NUM1 + ' times';
		}, 500), false);
</script>

```js
var tar = document.getElementById('throttle1'),
	NUM1 = 0;
tar.addEventListener('mousemove', 
	xui.throttle(function(e){
		NUM1++;
		e.target.innerHTML = 'move ' + NUM1 + ' times';
	}, 500), 
false);
```

3.这个时候节流函数就派上用场了, 此时延时为500ms, 意思是不管你移动的多块,500ms内我就是只执行一次
<div class="xui_test" id="throttle2"></div>

<script type="text/javascript">
	var tar2 = document.getElementById('throttle2'),
		NUM2 = 0;
	tar2.addEventListener('mousemove', 
		xui.throttle(function(e){
			NUM2++;
			e.target.innerHTML = 'move ' + NUM2 + ' times';
		}, 500, true), false);
</script>

```js
var tar2 = document.getElementById('throttle2'),
	NUM2 = 0;
tar2.addEventListener('mousemove', 
	xui.throttle(function(e){
		NUM2++;
		e.target.innerHTML = 'move ' + NUM2 + ' times';
	}, 500, true), 
false);
```