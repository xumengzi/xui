<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 一些不错的样式

>说明: 用来增强页面效果,提高用户体验度


#### 按钮`button`

<button class="xui_btn xui_btn_default">默认按钮</button>
<button disabled class="xui_btn xui_btn_default">默认按钮禁止</button>
<button class="xui_btn xui_btn_cancel">取消按钮</button>
<button disabled class="xui_btn xui_btn_cancel">取消按钮</button>


```html
<button class="xui_btn xui_btn_default">默认按钮</button>
<button disabled class="xui_btn xui_btn_default">默认按钮禁止</button>
<button class="xui_btn xui_btn_cancel">取消按钮</button>
<button disabled class="xui_btn xui_btn_cancel">取消按钮</button>
```

#### 输入框`input`

<div class="xui_item">
	<label>默认输入框: </label>
	<div class="xui_content">
		<input type="text" class="xui_input" placeholder="请输入关键字" />
	</div>
</div>
<div class="xui_item">
	<label>只读输入框: </label>
	<div class="xui_content">
		<input type="text" readonly="readonly" class="xui_input" placeholder="请输入关键字" />
	</div>
</div>
<div class="xui_item">
	<label>禁止输入框: </label>
	<div class="xui_content">
		<input type="text" disabled class="xui_input" placeholder="请输入关键字" />
	</div>
</div>
<div class="xui_item">
	<label class="xui_input_required">必选项: </label>
	<div class="xui_content">
		<input type="text" class="xui_input" placeholder="请输入关键字" />
	</div>
</div>
<div class="xui_item">
	<label>搜索框: </label>
	<div class="xui_content xui_input_search">
		<input type="text" class="xui_input" placeholder="请输入关键字" />
	</div>
</div>

```html
<div class="xui_item">
	<label>默认输入框: </label>
	<div class="xui_content">
		<input type="text" class="xui_input" placeholder="请输入关键字" />
	</div>
</div>
<div class="xui_item">
	<label>只读输入框: </label>
	<div class="xui_content">
		<input type="text" readonly="readonly" class="xui_input" placeholder="请输入关键字" />
	</div>
</div>
<div class="xui_item">
	<label>禁止输入框: </label>
	<div class="xui_content">
		<input type="text" disabled class="xui_input" placeholder="请输入关键字" />
	</div>
</div>
<div class="xui_item">
	<label class="xui_input_required">必选项: </label>
	<div class="xui_content">
		<input type="text" class="xui_input" placeholder="请输入关键字" />
	</div>
</div>
<div class="xui_item">
	<label>搜索框: </label>
	<div class="xui_content xui_input_search">
		<input type="text" class="xui_input" placeholder="请输入关键字" />
	</div>
</div>
```

#### 单选框`radio`
<div>
	<input class="xui_radio" id="radio_1" type="radio" name="radio" /><label for="radio_1" class="xui_radio_box">单选1</label>
	<input class="xui_radio" id="radio_2" type="radio" name="radio" /><label for="radio_2" class="xui_radio_box">单选2</label>
	<input class="xui_radio" id="radio_3" type="radio" name="radio" /><label for="radio_3" class="xui_radio_box">单选3</label>
	<input disabled class="xui_radio" id="radio_4" type="radio" name="radio" /><label for="radio_4" class="xui_radio_box">单选4</label>
</div>

```html
<input class="xui_radio" id="radio_1" type="radio" name="radio" />
<label for="radio_1" class="xui_radio_box">单选1</label>
<input class="xui_radio" id="radio_2" type="radio" name="radio" />
<label for="radio_2" class="xui_radio_box">单选2</label>
<input class="xui_radio" id="radio_3" type="radio" name="radio" />
<label for="radio_3" class="xui_radio_box">单选3</label>
<input disabled class="xui_radio" id="radio_4" type="radio" name="radio" />
<label for="radio_4" class="xui_radio_box">单选4</label>
```

#### 多选框`checkbox`
<div>
	<input class="xui_checkbox" id="checkbox_1" type="checkbox" name="checkbox" /><label for="checkbox_1" class="xui_checkbox_box">多选1</label>
	<input class="xui_checkbox" id="checkbox_2" type="checkbox" name="checkbox" /><label for="checkbox_2" class="xui_checkbox_box">多选2</label>
	<input class="xui_checkbox" id="checkbox_3" type="checkbox" name="checkbox" /><label for="checkbox_3" class="xui_checkbox_box">多选3</label>
	<input disabled class="xui_checkbox" id="checkbox_4" type="checkbox" name="checkbox" /><label for="checkbox_4" class="xui_checkbox_box">多选4</label>
</div>

```html
<input class="xui_checkbox" id="checkbox_1" type="checkbox" name="checkbox" />
<label for="checkbox_1" class="xui_checkbox_box">多选1</label>
<input class="xui_checkbox" id="checkbox_2" type="checkbox" name="checkbox" />
<label for="checkbox_2" class="xui_checkbox_box">多选2</label>
<input class="xui_checkbox" id="checkbox_3" type="checkbox" name="checkbox" />
<label for="checkbox_3" class="xui_checkbox_box">多选3</label>
<input disabled class="xui_checkbox" id="checkbox_4" type="checkbox" name="checkbox" />
<label for="checkbox_4" class="xui_checkbox_box">多选4</label>
```

#### 下拉框`select`
<select class="xui_select">
	<option value="1">hello</option>
	<option value="2">world</option>
	<option value="3">选项一</option>
	<option value="4">选项二</option>
	<option value="5">选项三</option>
	<option value="6">选项四</option>
</select>

```html
<select class="xui_select">
	<option value="1">hello</option>
	<option value="2">world</option>
	<option value="3">选项一</option>
	<option value="4">选项二</option>
	<option value="5">选项三</option>
	<option value="6">选项四</option>
</select>
```

#### 多行文本框`textarea`

<textarea class="xui_textarea"></textarea>

```html
<textarea class="xui_textarea"></textarea>
```

#### 开关`switch`
> 开关的可配置属性在`label`标签上,分别是`on`和`off`. 默认可以不加这个2个属性

<div>
	<input id="xui_switch" class="xui_switch" type="checkbox">
	<label for="xui_switch" class="xui_switch_box"></label>
	<input id="xui_switch_1" class="xui_switch" type="checkbox">
	<label for="xui_switch_1" on="开" off="关" class="xui_switch_box"></label>
	<input checked id="xui_switch_2" class="xui_switch" type="checkbox">
	<label for="xui_switch_2" on="√" off="×" class="xui_switch_box"></label>
	<input disabled id="xui_switch_3" class="xui_switch" type="checkbox">
	<label for="xui_switch_3" on="√" off="×" class="xui_switch_box"></label>
	<input checked id="xui_switch_4" class="xui_switch" type="checkbox">
	<label for="xui_switch_4" on="on" off="off" class="xui_switch_box"></label>
</div>

```html
//默认无文字
<input id="xui_switch" class="xui_switch" type="checkbox">
<label for="xui_switch" class="xui_switch_box"></label>
//显示开,关二字
<input id="xui_switch_1" class="xui_switch" type="checkbox">
<label for="xui_switch_1" on="开" off="关" class="xui_switch_box"></label>
//显示√,× 打开状态
<input checked id="xui_switch_2" class="xui_switch" type="checkbox">
<label for="xui_switch_2" on="√" off="×" class="xui_switch_box"></label>
//禁止开关
<input disabled id="xui_switch_3" class="xui_switch" type="checkbox">
<label for="xui_switch_3" on="√" off="×" class="xui_switch_box"></label>
//显示on,off 打开状态
<input checked id="xui_switch_4" class="xui_switch" type="checkbox">
<label for="xui_switch_4" on="on" off="off" class="xui_switch_box"></label>
```

#### 表格`table`
> 表格的一个重要的类目是`xui_table_wrap`, 如果文字过多就省略用`...`表示, 不加则会换行全部显示
> 当加上`xui_table_wrap`时,请务必在该标签上加一个`title`属性,以显示完整信息.

<div>
	<table class="xui_table">
		<thead>
			<tr>
				<th>姓名</th>
				<th>到达时间</th>
				<th>qq</th>
				<th>籍贯</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>张三</td>
				<td>2017</td>
				<td>1161231233</td>
				<td>来自北京海淀区</td>
			</tr>
			<tr>
				<td>李四</td>
				<td>2018</td>
				<td>65498433654</td>
				<td>来自上海</td>
			</tr>
			<tr>
				<td>王五</td>
				<td>2017</td>
				<td>1161231233</td>
				<td>我是一只来自北方的狼,为了填饱肚子来到西伯利亚去找喜羊羊吃,可是找了半天还没找到,然后我就饿死了</td>
			</tr>
		</tbody>
	</table>
	<table class="xui_table xui_table_wrap">
		<thead>
			<tr>
				<th>姓名</th>
				<th>到达时间</th>
				<th>qq</th>
				<th>籍贯</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>张三</td>
				<td>2017</td>
				<td>1161231233</td>
				<td>来自北京海淀区</td>
			</tr>
			<tr>
				<td>李四</td>
				<td>2018</td>
				<td>65498433654</td>
				<td>来自上海</td>
			</tr>
			<tr>
				<td>王五</td>
				<td>2017</td>
				<td>1161231233</td>
				<td title="我是一只来自北方的狼,为了填饱肚子来到西伯利亚去找喜羊羊吃,可是找了半天还没找到,然后我就饿死了">我是一只来自北方的狼,为了填饱肚子来到西伯利亚去找喜羊羊吃,可是找了半天还没找到,然后我就饿死了</td>
			</tr>
		</tbody>
	</table>
</div>

```html
<table class="xui_table">
		<thead>
			<tr>
				<th>姓名</th>
				<th>到达时间</th>
				<th>qq</th>
				<th>籍贯</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>王五</td>
				<td>2017</td>
				<td>1161231233</td>
				<td>我是一只来自北方的狼,为了填饱肚子来到西伯利亚去找喜羊羊吃,可是找了半天还没找到,然后我就饿死了</td>
			</tr>
		</tbody>
</table>
<table class="xui_table xui_table_wrap">
	<thead>
		<tr>
			<th>姓名</th>
			<th>到达时间</th>
			<th>qq</th>
			<th>籍贯</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>王五</td>
			<td>2017</td>
			<td>1161231233</td>
			<td>我是一只来自北方的狼,为了填饱肚子来到西伯利亚去找喜羊羊吃,可是找了半天还没找到,然后我就饿死了</td>
		</tr>
	</tbody>
</table>
```