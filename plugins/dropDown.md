<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 3.1.6 dropDown

>说明: 嫌原生下拉框比较丑,需要美化的时候,或者希望能够模糊搜索下拉框里的内容时.

##### 使用及参数说明:
```html
<select class="xui_select" id="">
	<option value="1">1</option>
</select>
```
```js
1.ES5时代
xui.dropDown({
	id: string,
	isSearch: boolean,
	placeHolder: string,
});

2.ES6时代
import dropDown from '../packages/dropDown';
let tt = new dropDown({
	id: string,
	isSearch: boolean,
	placeHolder: string,
});
tt.getCurrentValue();
```
* 复制好`html`,取一个`id`,然后初始化下拉框即可生成一个好看的下拉框, 用设置好的`id`即可获取到选中的值
* `id`表示下拉框的`id` **必传**
* `isSearch`表示是否显示模糊搜索框
* `placeHolder`表示搜索框的`placeholder`文案
* 没有你想要的功能? 快联系我: `xumeng0611@gmail.com`添加吧

### 效果展示

1.看看这个最简单配置
<select class="xui_select" id="diy1">
	<option value="1">1</option>
	<option value="2">2</option>
	<option value="3">3</option>
	<option value="4">4</option>
	<option value="5">5</option>
	<option value="6">6</option>
</select>

<script type="text/javascript">
xui.dropDown({
	id: 'diy1',
});
</script>

```js
xui.dropDown({
	id: 'diy1',
});
```

2.有一天客户说:我想搜索一下,这么多我眼睛都看花了.嗯,我们有办法应对.
>说明: 只需要在配置项里设置`isSearch`为`true`即可.

>说明: `placeHolder`是输入框的文案,可以自定义,默认是`type to search`

<select class="xui_select" id="diy2">
	<option value="1">1</option>
	<option value="2">客户</option>
	<option value="3">hello</option>
	<option value="4">world</option>
	<option value="5">reactJs</option>
	<option value="6">程序猿</option>
</select>

<script type="text/javascript">
xui.dropDown({
	id: 'diy2',
	isSearch: true,
	placeHolder: 'search',
});
</script>

```js
xui.dropDown({
	id: 'diy2',
	isSearch: true,
	placeHolder: 'search',
});
```

>温馨提示: 该搜索有一定的局限性,只是模糊匹配.

>比如下拉框里有`中国`,而你搜`中`,`国`或者`中国`都是可以搜出来的,但是里面掺杂别的数字或者字就搜索不出来了.