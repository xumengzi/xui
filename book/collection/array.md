<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>

# 4.1.4 Array

>数组对前端来说再常见不过了, 那么数组的那些方法到底熟悉不? 能否用普通函数实现一遍呢?

1. 数组的`map`方法. 正常用法大家应该都知道, 比如:

```js
var arr = [1, 2, 3];
var res = arr.map(function(item, index, arr){
    return item + index;
});
console.log(res); // [1, 3, 5]
```

接下来, 我就来用普通函数实现一下这个`map`函数, 叫`xmap`,挂在`Array`的`prototype`上面

```js
var arr = [1, 2, 3];
var res = arr.xmap(function(item, index, arr){
    console.log(this === arr)  // true
    return item + index;
}, arr);
console.log(res); // [1, 3, 5]
```

<script>
var arr = [1, 2, 3];
var res = arr.xmap(function(item, index, arr){
    console.log(this === arr)  // true
    return item + index;
}, arr);
console.log(res); // [1, 3, 5]
</script>

2.这里实现了`find`方法, 例子如下:
```js
var arr = [
    {
        id: 1,
        name: 'vue'
    },
    {
        id: 2,
        name: 'react'
    },
    {
        id: 3,
        name: 'xui'
    },
];
var res = arr.xfind(function(item, index, arr){
    return item.id === 3;
});
console.log(res);  //[{id:3,name:'xui'}]
```

3.嗯哼, `reduce`方法也实现了, 要不看看?
```js
var arr = [1, 2, 3, 4, 5];
var res = arr.xreduce(function(accum, next){
    return accum + next;
}, 6);
console.log(res); // 21
```