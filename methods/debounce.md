<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 2.1.3 debounce

>说明: 任务频繁触发的情况下，只有任务触发的间隔超过指定间隔的时候，任务才会执行

##### 使用及参数说明:
```js
xui.debounce(fn, await);
```
* `fn`表示需要进行防抖的函数
* `await`表示经过该时间后执行, 默认为300ms
* 没有你想要的功能? 快联系我: `me@xumengzi.top`添加吧

1.我们来想一下这个场景: 我们需要在用户输完用户名的时候去检测该用户名是否存在等等
我们怎么做呢? 像这样? 肯定是不行的, 首先这样会不停的触发异步请求, 服务器性能消耗过大

<div class="xui_item">
    <label>write something: </label>
    <div class="xui_content">
        <input type="text" id="debounce" class="xui_input" placeholder="请输入关键字" /><span></span>
    </div>
</div>

<script type="text/javascript">
	var tar = document.getElementById('debounce'),
		NUM = 0;
	tar.addEventListener('keydown', function(e){
		//去执行一个异步来判断用户名是否已经注册
		NUM++;
		e.target.nextSibling.innerHTML = NUM;
	},false);
</script>

```js
var tar = document.getElementById('debounce'),
	NUM = 0;
tar.addEventListener('keydown', function(e){
	//去执行一个异步来判断用户名是否已经注册
	NUM++;
	e.target.nextSibling.innerHTML = NUM;
},false);
```

2.那么使用防抖之后是怎样的呢? 
用户停止输入后500ms, 再去执行异步方法检测用户名是否被注册
<div class="xui_item">
    <label>write something: </label>
    <div class="xui_content">
        <input type="text" id="debounce1" class="xui_input" placeholder="请输入关键字" /><span></span>
    </div>
</div>

<script type="text/javascript">
	var name1 = document.getElementById('debounce1'),
		NUM1 = 0;
	name1.addEventListener('keydown', 
		xui.debounce(function(e){
			NUM1++;
			e.target.nextSibling.innerHTML = NUM1;
		}, 500),false);
</script>

```js
var name1 = document.getElementById('debounce1'),
	NUM1 = 0;
name1.addEventListener('keydown', 
	xui.debounce(function(e){
		NUM1++;
		e.target.nextSibling.innerHTML = NUM1;
	}, 500),false);
```