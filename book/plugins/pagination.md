<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 3.1.9 pagination

>说明: 当加载/渲染所有数据将花费很多时间时,可切换页码浏览数据。

##### 使用及参数说明:
```html
<div id="pagerId"></div>
```
```js
1.ES5时代
let myPage = new xui.pagination({
	id: string,
	index: number,
	total: number,
	isShowDot: boolean,
	isShowNum: boolean,
	isJumpPage: boolean,
});

2.ES6时代
import pagination from '../packages/pagination';
let myPage = new pagination({
	id: string,
	index: number,
	total: number,
	isShowDot: boolean,
	isShowNum: boolean,
	isJumpPage: boolean,
});
myPage.onClick = function(index){
	console.log(index);
}
myPage.onKeyUp = function(index){
	console.log(index);
}
```
* 复制好相应的`html`,取一个独特的`id`,然后初始化`init`就可以使用了,非常方便
* `id`表示分页的`id` **必传**
* `index`表示初始化显示哪一页的数字
* `total`表示分页的总页数 **必传**
* `isShowDot`表示是否将不可见的页数用...显示
* `isShowNum`表示是否显示当前页和总页数,格式为`index/total`
* `isJumpPage`表示是否显示支持跳转的输入框(纯数字),输入大于分页总数则默认跳至最后一页
* `onClick`可以获取当前点击分页的数字,可以用`ajax`获取数据,渲染页面
* `onKeyUp`可以获取当前输入分页的数字,可以用`ajax`获取数据,渲染页面
* 没有你想要的功能? 快联系我: `xumeng0611@gmail.com`添加吧

### 效果展示


1.先来看看最简单分页,麻雀虽小五脏俱全呀!
<div id="pagerId"></div>

<script type="text/javascript">
var myPage = new xui.pagination({
	id: 'pagerId',
	index: 1,
	total: 11,
});
myPage.onClick = function(index){
	console.log(index);
}
</script>
```html
<div id="pagerId"></div>
```

```js
var myPage = new xui.pagination({
	id: "pagerId",
	index: 1,
	total: 11,
});
myPage.onClick = function(index){
	console.log(index);
}
```

2.慢慢的你需要更多功能来满足日益增长的需求,所以没办法你把所有的配置都写上去了,期待这生一个完美的解决方案
<div id="pagerId1"></div>

<script type="text/javascript">
var myPage1 = new xui.pagination({
	id: 'pagerId1',
	index: 3,
	total: 20,
	isShowDot: true,
	isShowNum: true,
	isJumpPage: true,
});
myPage1.onClick = function(index){
	console.log(index);
}
myPage1.onKeyUp = function(index){
	console.log(index);
}
</script>
```html
<div id="pagerId"></div>
```

```js
var myPage1 = new xui.pagination({
	id: "pagerId1",
	index: 1,
	total: 11,
	isShowDot: true,
	isShowNum: true,
	isJumpPage: true,
});
myPage1.onClick = function(index){
	console.log(index);
}
myPage1.onKeyUp = function(index){
	console.log(index);
}
```