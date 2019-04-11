<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 3.2.3 snowFlake

>说明: 希望给页面上某个元素添加雪花飘洒的效果

##### 使用及参数说明:
```js
xui.snowFlake({
	id: string,
	direction: string
})
```
* `id`表示雪花容器,**必传**
* `direction`表示雪花的飘洒方向, 默认向右, 可以设置为`left`
* 需要注意的是, 建议给你容器一个宽高 ~_~
* 没有你想要的功能? 快联系我: `me@xumeng.site`添加吧

### 效果展示

1.人生当如冬之纯洁.
<div id="snow">
	<span>人生当如冬之纯洁</span>
	<span>Pure As Snow</span>
</div>

<style type="text/css">
#snow{
    width: 100%;
	height: 200px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9;
    background: linear-gradient(to bottom, #7dbacc, #fafcfd);
}
</style>

<script type="text/javascript">
xui.snowFlake({
	id: 'snow',
})
</script>

```js
xui.snowFlake({
	id: 'snow',
})
```

2.未若柳絮因风起
<div id="snow1">
	<span>未若柳絮因风起</span>
</div>

<style type="text/css">
	#snow1{
        width: 100%;
		height: 200px;
	    color: #fff;
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
	    z-index: 9;
	    filter: brightness(1.1);
	    background: linear-gradient(to bottom, #000, #fafcfd);
	}
</style>

<script type="text/javascript">
xui.snowFlake({
	id: 'snow1',
	direction: 'left',
})
</script>

```js
xui.snowFlake({
	id: 'snow1',
	direction: 'left',
})
```