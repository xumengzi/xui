<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 2.1.3 debounce

>说明: 任务频繁触发的情况下，只有任务触发的间隔超过指定间隔的时候，任务才会执行

1.我们先来看看一个简单的例子
<div class="xui_test" id="throttle"></div>

<style type="text/css">
.xui_test{
    width: 100%;
	height: 200px;
	margin: 20px auto;
	background: antiquewhite;
    color: brown;
    display: flex;
    align-items: center;
	justify-content: center;
}
</style>

<script type="text/javascript">
	var eg = document.getElementById('throttle'),
		NUM = 0;
	eg.addEventListener('mousemove', function(){
		NUM++;
		eg.innerHTML = 'mouse move' + NUM + 'times';
	});
</script>