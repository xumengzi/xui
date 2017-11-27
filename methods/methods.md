<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

#方法集合

#### 这里将会是方法集合

1.接上文,我想知道今天再加上5天的日期呢?
```js
xu.now(xu.now(), 5); //返回今天之后5天的日期;
xu.now(xu.now(), 5, true); //返回今天之后5天的日期(包含时分秒);
xu.now(xu.now(), -5); //是的,你也可以传负数,表示今天之前5天的日期.
xu.now(xu.now('2017/11/01'), -5); //嗯,你还可以自定义日期和天数,是不是非常棒!
```

2.我想验证手机号,咋办?很简单,只需要传入2个参数,验证类型(名字,手机号,邮件)和对应的`str`,返回一个`boolean`
```js
xu.checkLegal(type, str);
```

3.想获取`url`的某个参数呢?
```js
xu.queryString(str);
```

4.有时候后台传给我们一个数据库存放的日期,就需要前端来进行转换一下.第一个参数是传入的日期,第二个是`Boolean`,如果是`true`的话就精确到时分秒,否则就是年月日
```js
xu.formatDate(date, bool);
```

5.有时候为安全着想,我们需要把字符串符合等编码一下,那么传入相应的字符串即可, `codeStr`为编码,`decodeStr`为解码.
```js
xu.codeStr(str);
xu.decodeStr(str);
```

6.随机输出一个在xx到xx的范围内数字(包含边界)呢?
```js
xu.randomNum(1, 10);  //参数是从小到大排的
```

7.记录用户行为轨迹`get`方式请求
* 关于如何记录详情请戳[如何记录用户行为点击](http://xumengzi.top/).

<script>
xu.recordData({
	data: {
		name: 'xui.js',
		version: '1.0.1',
	},
	url: 'www.example.com?a=1&b=2',
});
</script>
```js
/*
传入需要统计的参数列表(对象形式)和异步接口地址API.
不用担心跨域问题哦!
只能以get方式请求.
*/
xu.recordData({
	data: {
		name: 'xui.js',
		version: '1.0.1',
	},
	url: 'www.example.com?a=1&b=2',
});
```
* 更多方法详见`xui.js`,哈哈