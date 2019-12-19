<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 3.1.8 calendar

>说明: 比原生的日历框好看了一点点,可以配置的功能也多了一点点

##### 使用及参数说明:
```html
<div class="xui_date_picker" >
	<input type="text" id="test" placeholder="请选择日期" class="xui_input xui_date_input" />
	<span class="xui_close_small" data-date=""></span>
</div>
```
```js
1.ES5时代
let test = xui.calendar({
	id: string,
	startDate: string,
	endDate: string,
	isToday: boolean,
	isOtherMonths: boolean,
	isChinese: boolean,
	fn: function(date){
		document.getElementById('test').value = date;
	}
});

2.ES6时代
import calender from '../packages/calender';
let test = calendar({
	id: string,
	startDate: string,
	endDate: string,
	isToday: boolean,
	isOtherMonths: boolean,
	isChinese: boolean,
	fn: function(date){
		document.getElementById('test').value = date;
	}
});

test.getCurrentDate();
test.setCurrentDate(1556193739382);
```

* 复制好html, 然后给你的日期选择框一个响亮的id, 接下来你就知道怎么做了吧!?
* `id`表示提示信息的文案 **必传**
* `startDate`和`endDate`表示日历的开始日期和结束日期 非必传,哈哈,就是你可以传1个或者2个,或者干脆不写
* `isToday`表示是否在日历下边显示'today'按钮, 用户就可以快速选择今天了.
* `isOtherMonths`表示是否显示除当前月的前一个月,后一个月的日期, 不传就是不显示咯!
* `isChinese`表示日历显示的语言,设置为true时显示为中文,默认为英文.
* `callback`表示选择日期后的回调, 怎么说呢,你不写不会报错,但是你无法获取用户选择的日期了哟!
* `<span class="xui_close_small" data-date=""></span>`表示鼠标`hover`显示一个清空选择的值,当然不加上去也不会报错
* `getCurrentDate`实例上的方法，用来获取当前选择的日期
* `setCurrentDate`实例上的方法，用来设置日历的展示值，支持`yyyy-mm-dd`, `yyyy/mm/dd`, `1556100117317`
* 没有你想要的功能? 快联系我: `xumeng0611@gmail.com`添加吧

### 效果展示

1.如果你仅仅是想用一下日历, 并不要求太多, 那么你可以这么做,代码非常简单
<div class="xui_date_picker">
	<input type="text" id="test" placeholder="请选择日期" class="xui_input xui_date_input" />
	<span class="xui_close_small" data-date=""></span>
</div>

<script type="text/javascript">
document.getElementById('test').onclick = function(){
	xui.calendar({
		id: 'test',
		fn: function(date){
			document.getElementById('test').value = date;
		}
	});
};
</script>

```js
xui.calendar({
	id: 'test',
	fn: function(date){
		document.getElementById('test').value = date;
	}
});
```

2.有些时候,产品经理会给你说我还要限制一下日期的选择,总不能选择10年前的日期啊. 那么着也简单,你加2个配置参数即可
<div class="xui_date_picker" >
	<input type="text" id="test1" placeholder="请选择日期" class="xui_input xui_date_input" />
	<span class="xui_close_small" data-date=""></span>
</div>

<script type="text/javascript">
document.getElementById('test1').onclick = function(){
	xui.calendar({
		id: 'test1',
		startDate: '2017/12/01',
		endDate: '2018/12/31',
		fn: function(date){
			document.getElementById('test1').value = date;
		}
	});
};
</script>

```js
xui.calendar({
	id: 'test1',
	startDate: '2017/12/01',
	endDate: '2018/12/31',
	fn: function(date){
		document.getElementById('test1').value = date;
	}
});
```

3.最后你不耐烦了, 把所有的功能都加上了,这下你该满足了吧! 哈哈
<div class="xui_date_picker" >
	<input type="text" id="test2" placeholder="请选择日期" class="xui_input xui_date_input" />
	<span class="xui_close_small" data-date=""></span>
</div>

<script type="text/javascript">
document.getElementById('test2').onclick = function(){
	xui.calendar({
		id: 'test2',
		startDate: '2017/12/01',
		endDate: '2020/12/31',
		isToday: true,
		isOtherMonths: true,
		isChinese: true,
		fn: function(date){
			document.getElementById('test2').value = date;
		}
	});
};
</script>

```js
xui.calendar({
	id: 'test2',
	startDate: '2017/12/01',
	endDate: '2020/12/31',
	isToday: true,
	isOtherMonths: true,
	isChinese: true,
	fn: function(date){
		document.getElementById('test2').value = date;
	}
});
```

