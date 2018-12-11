<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 样式

#### 这里会展示一些常用的样式

>说明:研究表明,适当的配色有助于用户的黏性,可以给用户带来直观的视觉感受

<style type="text/css">
	.color{
	    padding: 0;
	    margin: 0;
		width: 20%;
	    border-radius: 4px;
	    text-align: center;
	    line-height: 40px;
	    box-sizing: border-box;
	    font-size: 14px;
	    overflow: hidden;
	}
	.color span{
		width: 100%;
		display: inline-block;
		transition: transform .4s linear;
	}
	.color:hover span:nth-child(1){
		transform: translateX(-100%);
	}
	.color:hover span:nth-child(2){
		transform: translateX(-100%);
	}
</style>
#### 主色调
##### 主色调为绿色(原谅绿)`#4eb900`, hover的时候颜色为`#3b8704`
<div class="color xui_btn xui_btn_default"><span>#4eb900</span><span>#3b8704</span></div>

##### 用于警告的颜色为橘色`#fd7127`, hover的时候颜色为`#fd7127`
<div class="color xui_btn xui_btn_cancel">#fd7127</div>

##### 另外关于禁止的色调, 字体和边框色为`#ccc`, 背景色为`#f8f9f8`
##### 说了这么多,让我们去下一节探索一下吧!