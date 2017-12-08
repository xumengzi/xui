<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# prompt

>说明: 用来提示用户,是否进行下一步操作?

##### 使用及参数说明:
```js
xui.prompt({
	text: `主要的文案,字体较大`,
	tips: '次要的文案,字体较小,颜色较淡',
	type: 'success',
	delay: 0,
	confirmBtn: {
		text: '确定按钮的文案',
		fn(){
			xui.tips('确定按钮的回调');
		}
	},
	cancelBtn: {
		text: '取消按钮的文案',
		fn(){
			xui.tips('取消按钮的文案');
		}
	},
});
```
* 当没有按钮的时候,和提示信息展示类似,文案均可定制.
* 不限制按钮的个数,`type`提示弹框的风格有`default`,`success`,`fail`
* 没有你想要的功能? 快联系我: `me@xumengzi.top`添加吧


### 效果展示


1.先来看看简单的效果,仅仅是弹个框然后消失而已啦!
<button class="xui_btn xui_btn_default" id="show_prompt1">试试看</button>

<script type="text/javascript">
document.getElementById('show_prompt1').onclick=function(){
	xui.prompt({
		text: `恭喜您,兑换成功?`,
		tips: '我们正在为您处理',
		type: 'success',
		delay: 2000,
	});
}
</script>

```js
xui.prompt({
	text: `恭喜您,兑换成功?`,
	tips: '我们正在为您处理',
	type: 'success',
	delay: 2000,
});
```

2.接下来增加一点别的东西
<button class="xui_btn xui_btn_default" id="show_prompt2">试试看</button>

<script type="text/javascript">
document.getElementById('show_prompt2').onclick=function(){
	xui.prompt({
		text: `真棒,你已经充值了100Q币`,
		tips: '',
		type: 'success',
		delay: 0,
		confirmBtn: {
			text: '朕知道了',
			fn(){
				xui.tips('真墨迹!');
			}
		},
	});
}
</script>

```js
xui.prompt({
	text: `真棒,你已经充值了100Q币`,
	tips: '',
	type: 'success',
	delay: 0,
	confirmBtn: {
		text: '朕知道了',
		fn(){
			xui.tips('真墨迹!');
		}
	},
});
```

3.还有失败的案例
<button class="xui_btn xui_btn_default" id="show_prompt3">试试看</button>

<script type="text/javascript">
document.getElementById('show_prompt3').onclick=function(){
	xui.prompt({
		text: `哎,没有抽到奖诶!`,
		tips: '',
		type: 'fail',
		delay: 0,
		cancelBtn: {
			text: '再试试',
			fn(){
				xui.tips('不中就算了!');
			}
		},
	});
}
</script>

```js
xui.prompt({
	text: `哎,没有抽到奖诶!`,
	tips: '',
	type: 'fail',
	delay: 0,
	cancelBtn: {
		text: '再试试',
		fn(){
			xui.tips('不中就算了!');
		}
	}
});
```

4.完整的配置
<button class="xui_btn xui_btn_default" id="show_prompt4">试试看</button>

<script type="text/javascript">
document.getElementById('show_prompt4').onclick=function(){
	xui.prompt({
		text: `您确定要删除吗?`,
		tips: '要不再想想',
		type: 'success',
		delay: 0,
		confirmBtn: {
			text: '算了',
			fn(){
				xui.tips('看,劳资删了');
			}
		},
		cancelBtn: {
			text: '朕意已决',
			fn(){
				xui.tips('十年后又是好汉');
			}
		},
	});
}
</script>

```js
xui.prompt({
	text: `您确定要删除吗?`,
	tips: '要不再想想',
	type: 'success',
	delay: 0,
	confirmBtn: {
		text: '朕意已决',
		fn(){
			xui.tips('看,劳资删了');
		}
	},
	cancelBtn: {
		text: '算了',
		fn(){
			xui.tips('十年后又是好汉');
		}
	},
});
```