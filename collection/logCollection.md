<link rel="stylesheet" type="text/css" href="../assets/xui.css">
<script type="text/javascript" src="../assets/xui.js"></script>
<script type="text/javascript" src="../assets/log.js"></script>

# 4.1.2 log collection

1.错误日志收集

>一直以来，前端开发在本地就可以看到各种日志，但是你有没有想过一种情况，客户的站上出现了错误，但是你缺少足够的信息来定位问题，是不是很烦恼

##### 使用及参数说明:
```js
{
    "errorInfo": {
        "message": "Uncaught ReferenceError: b is not defined",
        "fileName": "http://localhost:4000/test/amusing/test.html",
        "lineNumber": 4,
        "colNumber": 52,
        "stack": "ReferenceError: b is not defined\n at a (http://localhost:4000/test/amusing/test.html:52:4)\n at http://localhost:4000/test/amusing/test.html:54:3",
        "target": {},
        "type": "error"
    },
    "useInfo": {
        "cookieEnabled": true,
        "data": "2019-03-08T11:19:36.089Z",
        "language": "en-US",
        "location": "http://localhost:4000/test/amusing/test.html",
        "platform": "MacIntel",
        "product": "Gecko",
        "referrer": "",
        "screen": "1440px",
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
    }
}
```
* 引用`log.js`，然后配置好发送错误日志的url即可（不用担心跨域）
* 由于IE浏览器对url字符长度的限制（2000左右），所以对于超过2000字符长度的情况时会对部分错误日志进行截取
* 没有你想要的功能? 快联系我: `me@xumengzi.top`添加吧

1.大部分错误都能被`catch`到，比如使用未声明的变量
```js
function a(){
    return b;
};
a();
```

2.另外当你写`Promise`的时候没有加错误处理函数，如果该函数`reject`抛出错误但是并没有被`catch`到，`log.js`会上报这个错误，比如你这样写：
>说明：当你使用`fetch`时也可以捕获到错误信息

```js
var promise = new Promise(function(resolve, reject){
    reject('error')
}).then(res =>{
    console.log(res)
});
```

3.还有如果有图片资源没有获取到，`log.js`也会上报图片资源到问题，同时包含该图片到一些基本信息
```html
<img id="id" class="style1 style2 style3" style="width: 300px" src="./not-found.png">
```