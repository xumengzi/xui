<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 4.1.1 algorithm

1.冒泡排序

>冒泡排序是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。

<style type="text/css">
	.center{
		text-align: center;
	}
</style>
<p><img src="../img/bubbleSort.gif" id="bubbleSort" alt="冒泡排序示意图"></p>
<p class="center">冒泡排序示意图(点击可放大)</p>

<script type="text/javascript">
document.getElementById('bubbleSort').onclick = function(e){
    xui.showImg(e.target.src, 'bubbleSort');
};
</script>

```js
function bubbleSort(arr){
	for(var i = 0; i < arr.length; i++){
		for(var j = 0; j < arr.length - 1 - i; j++){
			if(arr[j] > arr[j+1]){
				var temp = arr[j+1];
				arr[j+1] = arr[j];
				arr[j] = temp;
			};
		};
	};
	return arr;
};
var arr = [4, 1, 3, 2, 6, 1, 45, 65, 9, 454, 3455];
var res = bubbleSort(arr);
console.log(res);   // [1, 1, 2, 3, 4, 6, 9, 45, 65, 454, 3455]
```

2.to be continued