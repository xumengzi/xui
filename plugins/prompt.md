<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# prompt

>说明: 用来提示用户,是否进行下一步操作?

##### 使用及参数说明:
```js
xui.prompt({
	tips: `主要的文案,字体较大`,
	text: '次要的文案,字体较小,颜色较淡',
	isShowClose: boolean,
	confirmBtn: {
		text: '确定按钮的文案',
		fn(){
			xui.message('确定按钮的回调');
		}
	},
	cancelBtn: {
		text: '取消按钮的文案',
		fn(){
			xui.message('取消按钮的文案');
		}
	},
});
```
* 所有的参数都是非必传,如果你觉得我写的文案也不错的话
* `isShowClose`表示是否显示右上角关闭按钮
* 不限制按钮的个数,当然如果一个按钮都不配置, 那么保证`isShowClose`为`true`, 不然弹框无法关闭
* 按钮都有回调,右上角的关闭按钮和取消按钮的回调是一样的
* 没有你想要的功能? 快联系我: `me@xumengzi.top`添加吧


### 效果展示


1.先来看看简单的效果,仅仅是弹个框
<button class="xui_btn xui_btn_default" id="show_prompt1">试试看</button>

<script type="text/javascript">
document.getElementById('show_prompt1').onclick=function(){
	xui.prompt({
		tips: 'Title',
	    text: 'some comments',
	});
}
</script>

```js
xui.prompt({
	tips: 'Title',
    text: 'some comments',
});
```

2.有些时候,我们的场景不太一样,PM不想要那个要右上角那个关闭按钮
<button class="xui_btn xui_btn_default" id="show_prompt2">试试看</button>

<script type="text/javascript">
document.getElementById('show_prompt2').onclick=function(){
	xui.prompt({
		tips: '警告',
	    text: '您没有联网哦',
	    isShowClose: false,
	    cancelBtn: {
	        text: '朕明白',
	        fn(){
	            xui.message('联网去了');
	        }
	    },
	});
}
</script>

```js
xui.prompt({
	tips: '警告',
    text: '您没有联网哦',
    isShowClose: false,
    cancelBtn: {
        text: '朕明白',
        fn(){
            xui.message('联网去了');
        }
    },
});
```

3.接下来增加一点别的东西
<button class="xui_btn xui_btn_default" id="show_prompt3">试试看</button>

<script type="text/javascript">
document.getElementById('show_prompt3').onclick=function(){
	xui.prompt({
		tips: '提示',
	    text: '充值成功',
		confirmBtn: {
			text: 'ok',
			fn(){
				xui.message('朕晓得了');
			}
		},
	});
}
</script>

```js
xui.prompt({
	tips: '提示',
    text: '充值成功',
	confirmBtn: {
		text: 'ok',
		fn(){
			xui.message('朕晓得了');
		}
	},
});
```

4.完整的配置
<button class="xui_btn xui_btn_default" id="show_prompt4">试试看</button>

<script type="text/javascript">
document.getElementById('show_prompt4').onclick=function(){
	xui.prompt({
	    tips: 'Title',
	    text: 'some comments',
	    isShowClose: true,
	    confirmBtn: {
	        text: 'ok',
	        fn(){
	            xui.message('you clicked ok');
	        }
	    },
	    cancelBtn: {
	        text: 'cancel',
	        fn(){
	            xui.message('you clicked cancel');
	        }
	    },
	});
}
</script>

```js
xui.prompt({
    tips: 'Title',
    text: 'some comments',
    isShowClose: true,
    confirmBtn: {
        text: 'ok',
        fn(){
            xui.message('you clicked ok');
        }
    },
    cancelBtn: {
        text: 'cancel',
        fn(){
            xui.message('you clicked cancel');
        }
    },
});
```